export class SendMailRequest {
  receipt: String;
  subject: String;
  message: String;
  
  constructor(receipt: String, subject: String, message: String) {
    this.receipt = receipt;
    this.subject = subject;
    this.message = message;
  }
}
