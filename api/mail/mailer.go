package mail

import (
	"fmt"
	"log"
	"os/exec"
)

type Mailer struct {
	fromAddress  string
	toAddress    string
	emailSubject string
	doSendMails  bool
}

func (m *Mailer) Init(config Config) {
	m.fromAddress = config.FromAddress
	m.toAddress = config.ToAddress
	m.emailSubject = config.EmailSubject
	m.doSendMails = config.DoSendMails
}

func (m *Mailer) SendMail(message string) {
	// this needs to be executed concurrently to avoid waiting for the mail dialer response. If using the GWDG mailer
	// for example, and the program runs not on a GWDG server the connection can not be established after several seconds.
	if m.doSendMails {
		log.Println("Sending mail...")
		go m.sendMailAsync(message)
	}
}

func (m *Mailer) sendMailAsync(message string) {
	cmdNameEcho := "echo"
	arg0Echo := "-e"
	arg1Echo := fmt.Sprintf("From: %s\\r\\nTo: %s\\r\\nContent-Type: text/html\\r\\nSubject: %s\\r\\n\\r\\n%s", m.fromAddress, m.toAddress, m.emailSubject, message)
	cmdNameSendmail := "sendmail"
	arg0Sendmail := "-t"

	echoCmd := exec.Command(cmdNameEcho, arg0Echo, arg1Echo)
	sendmailCmd := exec.Command(cmdNameSendmail, arg0Sendmail)

	pipe, errPipe := echoCmd.StdoutPipe()
	if errPipe != nil {
		log.Println(errPipe.Error())
		return
	}
	defer pipe.Close()

	sendmailCmd.Stdin = pipe

	// Run ps first.
	echoCmd.Start()

	sendMailOutput, errSendmail := sendmailCmd.Output()

	log.Println(fmt.Sprint("sendmail output: ", sendMailOutput))

	if errSendmail != nil {
		log.Println(errSendmail.Error())
		return
	}
}
