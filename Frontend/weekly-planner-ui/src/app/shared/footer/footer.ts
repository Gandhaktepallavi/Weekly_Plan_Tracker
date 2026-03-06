import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { PlannerApiService } from '../../core/planner-api';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.html',
  styleUrls: ['./footer.css']
})
export class FooterComponent {
  showToast = false;
  toastMessage = '';
  showLoadModal = false;
  showSeedModal = false;
  selectedBackupFile: File | null = null;
  selectedBackupFileName = '';
  isImporting = false;

  constructor(private api: PlannerApiService) {}

  downloadMyData() {
    forkJoin({
      teamMembers: this.api.getTeamMembers(),
      backlog: this.api.getBacklog(),
      tasks: this.api.getTasks(),
      currentWeeklyPlan: this.api.getCurrentWeeklyPlan(),
      categorySettings: this.api.getCategorySettingsCurrent()
    }).subscribe({
      next: (data) => {
        const backup = {
          app: 'Weekly Plan Tracker',
          exportedAt: new Date().toISOString(),
          data
        };

        const json = JSON.stringify(backup, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = this.buildBackupFileName();
        anchor.click();
        URL.revokeObjectURL(url);

        this.openToast('Your data was saved to a file.');
      },
      error: () => {
        this.openToast('Failed to export data. Please try again.');
      }
    });
  }

  resetApp() {
    localStorage.clear();
    location.reload();
  }

  openLoadModal() {
    this.showLoadModal = true;
    this.selectedBackupFile = null;
    this.selectedBackupFileName = '';
  }

  closeLoadModal() {
    this.showLoadModal = false;
  }

  openSeedModal() {
    this.showSeedModal = true;
  }

  closeSeedModal() {
    this.showSeedModal = false;
  }

  onBackupFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;
    this.selectedBackupFile = file;
    this.selectedBackupFileName = file?.name ?? '';
  }

  loadDataFromFile() {
    if (!this.selectedBackupFile || this.isImporting) {
      return;
    }

    this.isImporting = true;
    const reader = new FileReader();

    reader.onload = () => {
      try {
        const raw = String(reader.result ?? '{}');
        const parsed = JSON.parse(raw);
        const payload = parsed?.data ? { data: parsed.data } : { data: parsed };

        this.api.importBackup(payload).subscribe({
          next: () => {
            this.isImporting = false;
            this.closeLoadModal();
            this.openToast('Your data was loaded from file.');
            setTimeout(() => location.reload(), 1200);
          },
          error: () => {
            this.isImporting = false;
            this.openToast('Failed to load backup file.');
          }
        });
      } catch {
        this.isImporting = false;
        this.openToast('Invalid backup file format.');
      }
    };

    reader.onerror = () => {
      this.isImporting = false;
      this.openToast('Unable to read selected file.');
    };

    reader.readAsText(this.selectedBackupFile);
  }

  seedSampleData() {
    if (this.isImporting) {
      return;
    }

    this.isImporting = true;
    this.api.seedSampleData().subscribe({
      next: () => {
        this.seedLocalStorageMembers();
        this.isImporting = false;
        this.closeSeedModal();
        this.openToast('Sample data loaded! Pick a person to get started.');
        setTimeout(() => location.reload(), 1400);
      },
      error: () => {
        this.isImporting = false;
        this.openToast('Failed to load sample data.');
      }
    });
  }

  closeToast() {
    this.showToast = false;
  }

  private openToast(message: string) {
    this.toastMessage = message;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 4000);
  }

  private buildBackupFileName(): string {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const hh = String(now.getHours()).padStart(2, '0');
    const min = String(now.getMinutes()).padStart(2, '0');
    const ss = String(now.getSeconds()).padStart(2, '0');
    return `weeklyplantracker-backup-${yyyy}-${mm}-${dd}-${hh}${min}${ss}.json`;
  }

  private seedLocalStorageMembers() {
    const existingRaw = localStorage.getItem('teamMembers');
    const existing = existingRaw ? JSON.parse(existingRaw) as any[] : [];

    const sample = [
      { id: crypto.randomUUID(), name: 'Alice Chen', isTeamLead: true },
      { id: crypto.randomUUID(), name: 'Bob Martinez', isTeamLead: false },
      { id: crypto.randomUUID(), name: 'Carol Singh', isTeamLead: false },
      { id: crypto.randomUUID(), name: 'Dave Kim', isTeamLead: false }
    ];

    const merged = [...existing];
    for (const member of sample) {
      const already = merged.some(m => (m.name || '').toLowerCase() === member.name.toLowerCase());
      if (!already) {
        merged.push(member);
      }
    }

    // keep one lead
    let leadSeen = false;
    for (const member of merged) {
      if (member.isTeamLead && !leadSeen) {
        leadSeen = true;
      } else if (member.isTeamLead && leadSeen) {
        member.isTeamLead = false;
      }
    }
    if (!leadSeen && merged.length > 0) {
      merged[0].isTeamLead = true;
    }

    localStorage.setItem('teamMembers', JSON.stringify(merged));
  }
}
