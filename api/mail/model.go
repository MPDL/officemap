package mail

type Config struct {
	FromAddress  string
	ToAddress    string
	EmailSubject string
	DoSendMails  bool
}
