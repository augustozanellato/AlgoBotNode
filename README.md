# AlgoBotNode
Un bot in fase di sviluppo per Discord

### File config:
- **index.js**, ascolta gli eventi ed esegue i comandi corrispettivi;
- **./commands/***, cartella dove sono presenti tutti i comandi sottoforma di moduli.<br/>
    Ogni modulo ha un nome, descrizione, usage, alias nel caso (array di stringhe che indica un altro nome per richiamare lo stesso comando) 
    e la funzione **execute()**, che sara' la funzione che verra' richiamata nel index alla richiesta di esecuzione del comando corrispondente;
- **config.json**, contiene il prefix (prefisso per indicare che sara' un comando del bot.  esempio:  {prefix + comando}).
