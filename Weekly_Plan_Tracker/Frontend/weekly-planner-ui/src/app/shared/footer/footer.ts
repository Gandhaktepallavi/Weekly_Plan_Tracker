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
  showResetModal = false;
  selectedBackupFile: File | null = null;
  selectedBackupFileName = '';
  isImporting = false;

  constructor(private api: PlannerApiService) {}

  downloadMyData() {
    forkJoin({
      teamMembers: this.api.getTeamMembers(),
      backlog: this.api.getBacklog(),
      weeklyPlans: this.api.getAllPlans(),
      tasks: this.api.getTasks(),
      categorySettings: this.api.getCategorySettings()
    }).subscribe({
      next: (payload) => {
        const backupPayload = {
          app: 'Weekly Plan Tracker',
          exportedAt: new Date().toISOString(),
          data: payload
        };

        const content = JSON.stringify(backupPayload, null, 2);
        const blob = new Blob([content], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = this.getBackupFileName();
        anchor.click();
        URL.revokeObjectURL(url);

        this.openToast('Your data was saved to a file.');
      },
      error: () => {
        this.openToast('Unable to download data. Please try again.');
      }
    });
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

  openResetModal() {
    this.showResetModal = true;
  }

  closeResetModal() {
    this.showResetModal = false;
  }

  onBackupFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;
    this.selectedBackupFile = file;
    this.selectedBackupFileName = file?.name ?? '';
  }

  importBackupFromFile() {
    if (!this.selectedBackupFile || this.isImporting) {
      return;
    }

    this.isImporting = true;
    const reader = new FileReader();

    reader.onload = () => {
      try
      {
        const raw = String(reader.result ?? '{}');
        const parsed = JSON.parse(raw);
        const payload = parsed?.data ? parsed : { data: parsed };
        const categorySettings = payload?.data?.categorySettings;

        this.api.importBackup(payload).subscribe({
          next: () => {
            if (categorySettings) {
              this.api.updateCategorySettings(categorySettings).subscribe({
                next: () => this.finishImportSuccess(),
                error: () => this.finishImportSuccess()
              });
            } else {
              this.finishImportSuccess();
            }
          },
          error: () => {
            this.isImporting = false;
            this.openToast('Failed to load backup file.');
          }
        });
      }
      catch
      {
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

  loadSampleData() {
    if (this.isImporting) {
      return;
    }

    this.isImporting = true;
    this.api.seedSampleData().subscribe({
      next: () => {
        this.isImporting = false;
        this.closeSeedModal();
        this.openToast('Sample data loaded! Pick a person to get started.');
        setTimeout(() => {
          location.reload();
        }, 1800);
      },
      error: () => {
        this.isImporting = false;
        this.openToast('Unable to load sample data.');
      }
    });
  }

  resetApp() {
    if (this.isImporting) {
      return;
    }

    this.isImporting = true;
    this.api.resetApp().subscribe({
      next: () => {
        localStorage.clear();
        this.isImporting = false;
        this.closeResetModal();
        this.openToast('App reset successfully.');
        setTimeout(() => {
          location.reload();
        }, 1500);
      },
      error: () => {
        this.isImporting = false;
        this.openToast('Unable to reset app.');
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

  private getBackupFileName(): string {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const hh = String(now.getHours()).padStart(2, '0');
    const min = String(now.getMinutes()).padStart(2, '0');
    const ss = String(now.getSeconds()).padStart(2, '0');

    return `weeklyplantracker-backup-${yyyy}-${mm}-${dd}-${hh}${min}${ss}.json`;
  }

  private finishImportSuccess() {
    this.isImporting = false;
    this.closeLoadModal();
    this.openToast('Your data was loaded from file.');
    setTimeout(() => {
      location.reload();
    }, 1800);
  }
}
