import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms'
import { MatSelectModule } from '@angular/material/select'
import { MatInputModule } from '@angular/material/input'
import { AppComponent } from './app.component'
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http'
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { DatesComponent } from './dates/dates.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs'; 
import { MatExpansionModule } from '@angular/material/expansion';
import { DetailsComponent } from './details/details.component';
import { OutputComponent } from './details/details.component';
import { QuillModule } from 'ngx-quill';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DragDropComponent } from './drag-drop/drag-drop.component';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogBoxComponent } from './drag-drop/drag-drop.component';
import { ConferenceComponent } from './conference/conference.component'
// import { ModifyComponent } from './conference/conference.component'
import { MatTableModule } from '@angular/material/table';
import { SetupComponent } from './setup/setup.component'; 

@NgModule({
  declarations: [
    AppComponent,
    DatesComponent,
    DetailsComponent,
    OutputComponent,
    DragDropComponent,
    DialogBoxComponent,
    ConferenceComponent,
    // ModifyComponent,
    SetupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    HttpClientModule,
    MatCheckboxModule,
    MatRadioModule,
    MatIconModule,
    MatTabsModule,
    MatExpansionModule,
    QuillModule.forRoot(),
    DragDropModule,
    MaterialFileInputModule,
    MatDialogModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }