# webapp_registro_react
lo scopo è creare pagina pubblica di benvenuto dove è possibile accedere con le credenziali.
- pagina di login con due barre di input, una username e una password, e un bottone vai, se le credenziali sono corrette il vai invoca il server (POST) e naviga verso home.
- se clicco registrati vado in una pagina signup, dove avrò una form contenente barre di input: nome, cognome, sesso, data di nascita (con verifica che sia maggiore di 18), codice fiscale, mail, password. bottone salva, fa chiamata al server che controlla se il codice fiscale esiste gia (chiave primaria del db), se no resituisce codice 200 e mi manda alla pagina home.

- pagina home: navbar con bottoncino laterale che apre un drawer (menu) con delle voci tipo chi siamo, contatti ecc. nel resto della pagina delle card che contengano le stesse voci del menu drawer.
la navbar deve essere presente in tutte le pagine che si aprono da utenti autenticati.
le voci del menù saranno:
- pagina profilo: come la pagina signup e con possibilita di modificare i dati, tranne il codice fiscale.
- pagina aggiuntastudenti: possibilita visualizzare la lista di studenti con bidoncino di fianco per eliminarli, possibilità di aggiungere studenti alla lista di quelli presenti nella pagina, salvati da qualche parte.
- pagina registro: tabella con studenti popolata da un #API(path dati dal prof) storico delle presenze degli studenti, con le date, e la possibilità di modificare le presenze. in basso alla pagina un + che indirizzi a un'altra pagina di nuova presenza.
- pagina nuovapresenza: possibilita di inserire presenze odierne (di default), la data di oggi è chiave, oppure di selezionare un giorno attraverso un calendario e per ogni studente del registro c'è la possibilita di inserire gli orari di presenza. se si vuole mettere uno studente nuovo possibilita di aggiungerlo dalla pagina aggiuntastudenti.  

ogni volta che entro in una pagina nuova si aggiornanp i dati. non useremo un database ma inizialmente partiremo da un file json e salveremo i dati sul server.

cosa utilizzare: 
-react
-mui
-ts
-react-router
