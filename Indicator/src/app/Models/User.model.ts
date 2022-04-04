export class User {
  constructor(
    public im: string,
    public nom: string,
    public prenom: string,
    public email: string,
    public motDePasse: string,
    public confirmMotDePasse: string
  ) { }
}
