import {Injectable} from '@angular/core';
import {ScriptsLoaderService} from './scripts-loader.service';

@Injectable({
  providedIn: 'root'
})

/* =====================
    # Same scripts and stylesheets are imported in multiple components to use list view so
    # this service was created to avoid duplicated code and facilitate maintenance
   ===================== */

export class ListViewLoaderService {
  // we use these two variables to assure that js libraries and css are loaded only once
  isLibraryLoaded = false;
  isCssLoaded = false;
  isDataListInitialized = false;

  constructor(private scriptsLoaderService: ScriptsLoaderService) {
  }


  loadDataListViewScript = async (): Promise<void> => {
    if (!this.isLibraryLoaded) {
      await this.loadLibraryScript();
      this.isLibraryLoaded = true;
    }
    // if (this.isDataListInitialized) {
    //   return;
    // }
    this.loadDataListInitializeScript();
    this.isDataListInitialized = true;
  }

  async loadLibraryScript() {
    await this.scriptsLoaderService.addManyScriptsAsync(
      '/assets/vendors/js/tables/datatable/datatables.min.js',
      '/assets/vendors/js/tables/datatable/datatables.bootstrap4.min.js',
      '/assets/vendors/js/tables/datatable/dataTables.select.min.js',
      '/assets/vendors/js/tables/datatable/datatables.buttons.min.js',
      '/assets/vendors/js/tables/datatable/buttons.bootstrap.min.js',
      '/assets/vendors/js/tables/datatable/datatables.checkboxes.min.js'
    );
  }

  loadDataListInitializeScript() {
    this.scriptsLoaderService.addManyScriptsAsync(
      '/assets/js/scripts/ui/data-list-view.js').then(() => {
        const event = document.createEvent('Event');
        event.initEvent('list-script-loaded', true, true);
        document.dispatchEvent(event);
      }
    );
  }

  loadStylesheets(): void {
    if (this.isCssLoaded) {
      this.isLibraryLoaded = true;
      return;
    }
    this.scriptsLoaderService.addStylesheets(
      '/assets/css/plugins/file-uploaders/dropzone.css',
      '/assets/css/pages/data-list-view.css',
      '/assets/vendors/css/vendors.min.css',
      '/assets/vendors/css/tables/datatable/datatables.min.css',
      '/assets/vendors/css/tables/datatable/extensions/dataTables.checkboxes.css',
      '/assets/css/colors.css'
    );
  }

  /*=============================================================================
   There was a problem where second page doesn't fire the event responsible for
   revealing the sidebar , so we created this function to fire the event manually
   and called it on every list element click.
   it is called in multiple ways inside the code
   ==============================================================================*/
  fireEventEditClicked(): void {
    const event = document.createEvent('Event');
    event.initEvent('edit-clicked', true, true);
    document.dispatchEvent(event);
  }
}
