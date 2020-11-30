import { NgModule, Optional, SkipSelf } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { ConfigService } from './services/config.service';



@NgModule({
  imports: [CommonModule],
  declarations: [
    
  ],
  exports: [],
  providers: [ConfigService],
  entryComponents: [     
  ],
})
export class CoreModule { 

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    // Import guard
    if (parentModule) {
      throw new Error(`${parentModule} has already been loaded. Import Core module in the AppModule only.`);
    }
  }
}