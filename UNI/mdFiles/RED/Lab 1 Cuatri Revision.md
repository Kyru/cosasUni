### LAB 2

**SMTP CONNECTIONS:**
   > [user@host]# telnet smtp.domain.com 25
   Trying 192.168.0.1...
   Connected to smtp.domain.com (192.168.0.1).
   Escape character is '^]'.
   220 myrelay.domain.com ESMTP
   HELO smtp.domain.com
   250 myrelay.domain.com
   MAIL FROM:<alice@hacker.com>
   250 sender <alice@hacker.com> ok
   RCPT TO:<bob@secure.net>
   250 recipient <bob@secure.net> ok
   DATA
   354 go ahead
   From: [Alice Hacker] <alice@hacker.com>
   To: [Bob Smith] <bob@secure.net>
   Date: Mon, 12 Apr 2010 14:21:26 -0400
   Subject: Test Message

   > Hi there!
   > This is supposed to be a real email...

   > Have a good day!
   > Alice


   > .
   > 250 ok:  Message 222220902 accepted
   QUIT
   221 myrelay.domain.com
   Connection closed by foreign host.
   [user@host]#

**POP3 COMMANDS:**
> Minimal POP3 Commands:

     > USER name               valid in the AUTHORIZATION state
      PASS string
      QUIT

      > STAT                    valid in the TRANSACTION state
       LIST [msg]
      RETR msg
      DELE msg
      NOOP
      RSET

     > QUIT                    valid in the UPDATE state

   > Optional POP3 Commands:

   >    APOP name digest        valid in the AUTHORIZATION state

   >    TOP msg n               valid in the TRANSACTION state
   >    UIDL [msg]

   > POP3 Replies:

   >    +OK
       -ERR
       
       
Important comands: 
	nslookup www.mit.edu 
	nslookup -type=NS mit.edu

dentro de nslookup te puedes encontrar:
\> set type=NS
\> stanford.edu
\> … answer … 

