import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/Models/User.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;
  message: string;
  isMessage = false;
  error: boolean;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.signUpForm = this.formBuilder.group({
      'im': ['', Validators.required],
      'nom': ['', Validators.required],
      'prenom': ['', Validators.required],
      'email': ['', Validators.email],
      'mdp': ['', Validators.required],
      'confirm': ['', Validators.required]
    });
  }
  onSubmit() {
    const formValue = this.signUpForm.value;
    if (formValue['confirm'] === formValue['mdp']) {
      const newUser = new User(
        formValue['im'],
        formValue['nom'],
        formValue['prenom'],
        formValue['email'],
        formValue['mdp'],
        formValue['confirm']
      );
      this.isMessage = true;
      this.error = false;
      this.message = "Utilisateur enregistré"
      console.log(newUser);
    } else {
      this.isMessage = true;
      this.error = true;
      this.message = "Mot de passe incorrect"
    }

  }


}
