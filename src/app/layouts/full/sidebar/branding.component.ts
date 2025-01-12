import { Component } from '@angular/core';

@Component({
  selector: 'app-branding',
  template: `
    <div class="branding">
      <a href="/">
        <img
          src="./assets/images/logos/LogoSuperior.png"
          class="align-middle m-2"
          alt="logo"
          height="70px"
        />
      </a>
    </div>
  `,
})
export class BrandingComponent {
  constructor() {}
}
