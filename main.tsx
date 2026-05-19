import React, { useMemo, useState } from "react";

type CurrencyKey = "EUR" | "USD" | "GBP" | "NOK" | "SEK" | "DKK" | "CHF" | "CAD" | "AUD";
type LanguageKey = "en" | "nl" | "de" | "fr" | "es" | "it" | "sv" | "da" | "no";

type CurrencyConfig = {
  label: string;
  code: string;
  locale: string;
  denominations: number[];
  roundOptions: number[];
};

const CURRENCIES: Record<CurrencyKey, CurrencyConfig> = {
  EUR: {
    label: "Euro",
    code: "EUR",
    locale: "nl-NL",
    denominations: [100, 50, 20, 10, 5, 2, 1, 0.5, 0.2, 0.1, 0.05],
    roundOptions: [0.05, 0.1, 0.2, 0.5, 1, 5, 10],
  },
  USD: {
    label: "US Dollar",
    code: "USD",
    locale: "en-US",
    denominations: [100, 50, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01],
    roundOptions: [0.01, 0.05, 0.1, 0.25, 0.5, 1, 5, 10],
  },
  GBP: {
    label: "British Pound",
    code: "GBP",
    locale: "en-GB",
    denominations: [50, 20, 10, 5, 2, 1, 0.5, 0.2, 0.1, 0.05, 0.02, 0.01],
    roundOptions: [0.01, 0.02, 0.05, 0.1, 0.2, 0.5, 1, 5, 10],
  },
  NOK: {
    label: "Norwegian Krone",
    code: "NOK",
    locale: "nb-NO",
    denominations: [1000, 500, 200, 100, 50, 20, 10, 5, 1],
    roundOptions: [1, 5, 10, 20, 50],
  },
  SEK: {
    label: "Swedish Krona",
    code: "SEK",
    locale: "sv-SE",
    denominations: [1000, 500, 200, 100, 50, 20, 10, 5, 2, 1],
    roundOptions: [1, 2, 5, 10, 20, 50],
  },
  DKK: {
    label: "Danish Krone",
    code: "DKK",
    locale: "da-DK",
    denominations: [1000, 500, 200, 100, 50, 20, 10, 5, 2, 1, 0.5],
    roundOptions: [0.5, 1, 2, 5, 10, 20, 50],
  },
  CHF: {
    label: "Swiss Franc",
    code: "CHF",
    locale: "de-CH",
    denominations: [1000, 200, 100, 50, 20, 10, 5, 2, 1, 0.5, 0.2, 0.1, 0.05],
    roundOptions: [0.05, 0.1, 0.2, 0.5, 1, 5, 10],
  },
  CAD: {
    label: "Canadian Dollar",
    code: "CAD",
    locale: "en-CA",
    denominations: [100, 50, 20, 10, 5, 2, 1, 0.25, 0.1, 0.05],
    roundOptions: [0.05, 0.1, 0.25, 0.5, 1, 5, 10],
  },
  AUD: {
    label: "Australian Dollar",
    code: "AUD",
    locale: "en-AU",
    denominations: [100, 50, 20, 10, 5, 2, 1, 0.5, 0.2, 0.1, 0.05],
    roundOptions: [0.05, 0.1, 0.2, 0.5, 1, 5, 10],
  },
};

const TRANSLATIONS = {
  en: {
    languageName: "English",
    chooseLanguage: "Choose language",
    chooseLanguageText: "Select the language you want to use in the app.",
    chooseCurrency: "Choose currency",
    chooseCurrencyText: "Select the currency you want to use for tip money and change money.",
    employees: "Employees",
    employeesText: "Add everyone who should receive tips. Factor is optional.",
    workedHours: "Worked hours",
    workedHoursText: "Fill out the number of hours per employee.",
    tipMoney: "Tip money",
    changeMoney: "Change money",
    roundOff: "Round off",
    roundOffText: "Choose the amount you want to round payouts down to.",
    calculate: "Calculate",
    calculateText: "Change first, then pay out tips using the instructions below.",
    addEmployee: "Add employee",
    name: "Name",
    factor: "Factor",
    hours: "Hours",
    employee: "Employee",
    total: "Total",
    back: "Back",
    next: "Next",
    changeInstructions: "Change instructions",
    takeOut: "Take out of change money",
    addToChange: "Add to change money",
    leftoverTipMoney: "Leftover tip money",
    payoutInstructions: "Payout instructions",
    totalPaidOut: "Total paid out",
    leaveInTipJar: "Leave in tip jar",
    nothing: "nothing",
    pressCalculate: "Press Calculate after filling in the required information.",
    errorEmployee: "Add at least one employee with worked hours.",
    errorTipMoney: "Add tip money first.",
    errorWeightedHours: "Total weighted hours must be greater than zero.",
    errorChange: "Not enough change available. Round to a larger amount or add more change first.",
    errorBalance: "Could not balance the register with the available tip money.",
    errorOverChange: "Could not return the over-exchanged difference from the register.",
  }, nl: {
    languageName: "Nederlands",
    chooseLanguage: "Kies taal",
    chooseLanguageText: "Kies de taal die je in de app wilt gebruiken.",
    chooseCurrency: "Kies valuta",
    chooseCurrencyText: "Kies de valuta die je wilt gebruiken voor de fooi en het wisselgeld.",
    employees: "Medewerkers",
    employeesText: "Voeg iedereen toe die fooi moet ontvangen. Factor is optioneel.",
    workedHours: "Gewerkte uren",
    workedHoursText: "Vul per medewerker in hoeveel uur diegene heeft gewerkt.",
    tipMoney: "Fooi",
    changeMoney: "Wisselgeld",
    roundOff: "Afronden",
    roundOffText: "Kies waarop je de uitbetalingen naar beneden wilt afronden.",
    calculate: "Berekenen",
    calculateText: "Wissel eerst het geld zoals hieronder staat en betaal daarna de fooi uit.",
    addEmployee: "Medewerker toevoegen",
    name: "Naam",
    factor: "Factor",
    hours: "Uren",
    employee: "Medewerker",
    total: "Totaal",
    back: "Terug",
    next: "Volgende",
    changeInstructions: "Wisselinstructies",
    takeOut: "Haal uit het wisselgeld",
    addToChange: "Stop bij het wisselgeld",
    leftoverTipMoney: "Fooi over",
    payoutInstructions: "Uitbetaalinstructies",
    totalPaidOut: "Totaal uitbetaald",
    leaveInTipJar: "Laat in de fooienpot",
    nothing: "niets",
    pressCalculate: "Klik op Berekenen nadat je de gegevens hebt ingevuld.",
    errorEmployee: "Voeg minimaal één medewerker met gewerkte uren toe.",
    errorTipMoney: "Vul eerst de fooi in.",
    errorWeightedHours: "Het totaal aantal gewogen uren moet groter zijn dan nul.",
    errorChange: "Niet genoeg wisselgeld beschikbaar. Rond af op een groter bedrag of zorg eerst voor meer wisselgeld.",
    errorBalance: "Het wisselgeld kan niet worden gebalanceerd met de beschikbare fooi.",
    errorOverChange: "Het extra gewisselde verschil kan niet uit het wisselgeld worden gehaald.",
  }, de: {
    languageName: "Deutsch",
    chooseLanguage: "Sprache wählen",
    chooseLanguageText: "Wähle die Sprache, die du in der App verwenden möchtest.",
    chooseCurrency: "Währung wählen",
    chooseCurrencyText: "Wähle die Währung für Trinkgeld und Wechselgeld.",
    employees: "Mitarbeiter",
    employeesText: "Füge alle Personen hinzu, die Trinkgeld erhalten sollen. Der Faktor ist optional.",
    workedHours: "Gearbeitete Stunden",
    workedHoursText: "Trage ein, wie viele Stunden jede Person gearbeitet hat.",
    tipMoney: "Trinkgeld",
    changeMoney: "Wechselgeld",
    roundOff: "Runden",
    roundOffText: "Wähle, auf welchen Betrag die Auszahlungen abgerundet werden sollen.",
    calculate: "Berechnen",
    calculateText: "Wechsle zuerst das Geld wie unten angegeben und zahle danach das Trinkgeld aus.",
    addEmployee: "Mitarbeiter hinzufügen",
    name: "Name",
    factor: "Faktor",
    hours: "Stunden",
    employee: "Mitarbeiter",
    total: "Gesamt",
    back: "Zurück",
    next: "Weiter",
    changeInstructions: "Wechselanweisungen",
    takeOut: "Aus dem Wechselgeld nehmen",
    addToChange: "Zum Wechselgeld hinzufügen",
    leftoverTipMoney: "Übriges Trinkgeld",
    payoutInstructions: "Auszahlungsanweisungen",
    totalPaidOut: "Gesamt ausgezahlt",
    leaveInTipJar: "In der Trinkgeldkasse lassen",
    nothing: "nichts",
    pressCalculate: "Klicke auf Berechnen, nachdem du alle Daten eingegeben hast.",
    errorEmployee: "Füge mindestens eine Person mit gearbeiteten Stunden hinzu.",
    errorTipMoney: "Gib zuerst das Trinkgeld ein.",
    errorWeightedHours: "Die gewichteten Gesamtstunden müssen größer als null sein.",
    errorChange: "Nicht genug Wechselgeld verfügbar. Runde auf einen größeren Betrag oder sorge zuerst für mehr Wechselgeld.",
    errorBalance: "Das Wechselgeld kann mit dem verfügbaren Trinkgeld nicht ausgeglichen werden.",
    errorOverChange: "Die extra gewechselte Differenz kann nicht aus dem Wechselgeld genommen werden.",
  },
  fr: {
    languageName: "Français",
    chooseLanguage: "Choisir la langue",
    chooseLanguageText: "Choisissez la langue que vous voulez utiliser dans l’application.",
    chooseCurrency: "Choisir la devise",
    chooseCurrencyText: "Choisissez la devise pour les pourboires et la monnaie.",
    employees: "Employés",
    employeesText: "Ajoutez toutes les personnes qui doivent recevoir des pourboires. Le facteur est optionnel.",
    workedHours: "Heures travaillées",
    workedHoursText: "Indiquez le nombre d’heures travaillées par employé.",
    tipMoney: "Pourboires",
    changeMoney: "Monnaie",
    roundOff: "Arrondir",
    roundOffText: "Choisissez le montant auquel les paiements doivent être arrondis vers le bas.",
    calculate: "Calculer",
    calculateText: "Changez d’abord l’argent comme indiqué ci-dessous, puis payez les pourboires.",
    addEmployee: "Ajouter un employé",
    name: "Nom",
    factor: "Facteur",
    hours: "Heures",
    employee: "Employé",
    total: "Total",
    back: "Retour",
    next: "Suivant",
    changeInstructions: "Instructions de change",
    takeOut: "Prendre dans la caisse",
    addToChange: "Ajouter à la caisse",
    leftoverTipMoney: "Pourboire restant",
    payoutInstructions: "Instructions de paiement",
    totalPaidOut: "Total payé",
    leaveInTipJar: "Laisser dans le pot à pourboires",
    nothing: "rien",
    pressCalculate: "Cliquez sur Calculer après avoir rempli les informations nécessaires.",
    errorEmployee: "Ajoutez au moins un employé avec des heures travaillées.",
    errorTipMoney: "Ajoutez d’abord les pourboires.",
    errorWeightedHours: "Le total des heures pondérées doit être supérieur à zéro.",
    errorChange: "Pas assez de monnaie disponible. Arrondissez à un montant plus grand ou ajoutez d’abord plus de monnaie.",
    errorBalance: "La caisse ne peut pas être équilibrée avec les pourboires disponibles.",
    errorOverChange: "La différence échangée en trop ne peut pas être retirée de la caisse.",
  },
  es: {
    languageName: "Español",
    chooseLanguage: "Elegir idioma",
    chooseLanguageText: "Selecciona el idioma que quieres usar en la app.",
    chooseCurrency: "Elegir moneda",
    chooseCurrencyText: "Selecciona la moneda para las propinas y el cambio.",
    employees: "Empleados",
    employeesText: "Añade a todas las personas que deben recibir propinas. El factor es opcional.",
    workedHours: "Horas trabajadas",
    workedHoursText: "Introduce las horas trabajadas por cada empleado.",
    tipMoney: "Propinas",
    changeMoney: "Cambio",
    roundOff: "Redondear",
    roundOffText: "Elige a qué importe se deben redondear hacia abajo los pagos.",
    calculate: "Calcular",
    calculateText: "Primero cambia el dinero como se indica abajo y después paga las propinas.",
    addEmployee: "Añadir empleado",
    name: "Nombre",
    factor: "Factor",
    hours: "Horas",
    employee: "Empleado",
    total: "Total",
    back: "Atrás",
    next: "Siguiente",
    changeInstructions: "Instrucciones de cambio",
    takeOut: "Sacar del cambio",
    addToChange: "Añadir al cambio",
    leftoverTipMoney: "Propina restante",
    payoutInstructions: "Instrucciones de pago",
    totalPaidOut: "Total pagado",
    leaveInTipJar: "Dejar en el bote de propinas",
    nothing: "nada",
    pressCalculate: "Pulsa Calcular después de completar la información necesaria.",
    errorEmployee: "Añade al menos un empleado con horas trabajadas.",
    errorTipMoney: "Introduce primero las propinas.",
    errorWeightedHours: "El total de horas ponderadas debe ser mayor que cero.",
    errorChange: "No hay suficiente cambio disponible. Redondea a un importe mayor o añade más cambio primero.",
    errorBalance: "No se puede equilibrar la caja con las propinas disponibles.",
    errorOverChange: "No se puede sacar de la caja la diferencia cambiada de más.",
  },
  it: {
    languageName: "Italiano",
    chooseLanguage: "Scegli lingua",
    chooseLanguageText: "Seleziona la lingua che vuoi usare nell’app.",
    chooseCurrency: "Scegli valuta",
    chooseCurrencyText: "Seleziona la valuta per le mance e il resto.",
    employees: "Dipendenti",
    employeesText: "Aggiungi tutte le persone che devono ricevere le mance. Il fattore è opzionale.",
    workedHours: "Ore lavorate",
    workedHoursText: "Inserisci le ore lavorate per ogni dipendente.",
    tipMoney: "Mance",
    changeMoney: "Resto",
    roundOff: "Arrotonda",
    roundOffText: "Scegli l’importo a cui arrotondare verso il basso i pagamenti.",
    calculate: "Calcola",
    calculateText: "Prima cambia il denaro come indicato sotto, poi paga le mance.",
    addEmployee: "Aggiungi dipendente",
    name: "Nome",
    factor: "Fattore",
    hours: "Ore",
    employee: "Dipendente",
    total: "Totale",
    back: "Indietro",
    next: "Avanti",
    changeInstructions: "Istruzioni per il cambio",
    takeOut: "Prendi dal resto",
    addToChange: "Aggiungi al resto",
    leftoverTipMoney: "Mancia rimanente",
    payoutInstructions: "Istruzioni di pagamento",
    totalPaidOut: "Totale pagato",
    leaveInTipJar: "Lascia nel barattolo delle mance",
    nothing: "niente",
    pressCalculate: "Premi Calcola dopo aver inserito le informazioni richieste.",
    errorEmployee: "Aggiungi almeno un dipendente con ore lavorate.",
    errorTipMoney: "Inserisci prima le mance.",
    errorWeightedHours: "Il totale delle ore ponderate deve essere maggiore di zero.",
    errorChange: "Non c’è abbastanza resto disponibile. Arrotonda a un importo più grande o aggiungi prima più resto.",
    errorBalance: "Non è possibile bilanciare la cassa con le mance disponibili.",
    errorOverChange: "Non è possibile prelevare dalla cassa la differenza cambiata in eccesso.",
  },
  sv: {
    languageName: "Svenska",
    chooseLanguage: "Välj språk",
    chooseLanguageText: "Välj vilket språk du vill använda i appen.",
    chooseCurrency: "Välj valuta",
    chooseCurrencyText: "Välj valuta för dricks och växelkassa.",
    employees: "Medarbetare",
    employeesText: "Lägg till alla som ska få dricks. Faktor är valfritt.",
    workedHours: "Arbetade timmar",
    workedHoursText: "Fyll i antal arbetade timmar per medarbetare.",
    tipMoney: "Dricks",
    changeMoney: "Växelkassa",
    roundOff: "Avrunda",
    roundOffText: "Välj vilket belopp utbetalningarna ska avrundas ned till.",
    calculate: "Beräkna",
    calculateText: "Växla först pengarna enligt instruktionerna nedan och betala sedan ut dricksen.",
    addEmployee: "Lägg till medarbetare",
    name: "Namn",
    factor: "Faktor",
    hours: "Timmar",
    employee: "Medarbetare",
    total: "Totalt",
    back: "Tillbaka",
    next: "Nästa",
    changeInstructions: "Växlingsinstruktioner",
    takeOut: "Ta från växelkassan",
    addToChange: "Lägg till i växelkassan",
    leftoverTipMoney: "Dricks kvar",
    payoutInstructions: "Utbetalningsinstruktioner",
    totalPaidOut: "Totalt utbetalt",
    leaveInTipJar: "Lämna i dricksburken",
    nothing: "inget",
    pressCalculate: "Tryck på Beräkna efter att du fyllt i all information.",
    errorEmployee: "Lägg till minst en medarbetare med arbetade timmar.",
    errorTipMoney: "Fyll först i dricksen.",
    errorWeightedHours: "Totalt antal viktade timmar måste vara större än noll.",
    errorChange: "Inte tillräckligt med växel finns tillgängligt. Avrunda till ett större belopp eller lägg först till mer växel.",
    errorBalance: "Växelkassan kan inte balanseras med den tillgängliga dricksen.",
    errorOverChange: "Den extra växlade differensen kan inte tas från växelkassan.",
  },
  da: {
    languageName: "Dansk",
    chooseLanguage: "Vælg sprog",
    chooseLanguageText: "Vælg det sprog, du vil bruge i appen.",
    chooseCurrency: "Vælg valuta",
    chooseCurrencyText: "Vælg valuta til drikkepenge og byttepenge.",
    employees: "Medarbejdere",
    employeesText: "Tilføj alle, der skal have drikkepenge. Faktor er valgfri.",
    workedHours: "Arbejdstimer",
    workedHoursText: "Indtast antal arbejdstimer pr. medarbejder.",
    tipMoney: "Drikkepenge",
    changeMoney: "Byttepenge",
    roundOff: "Afrund",
    roundOffText: "Vælg hvilket beløb udbetalingerne skal rundes ned til.",
    calculate: "Beregn",
    calculateText: "Byt først pengene som angivet nedenfor, og udbetal derefter drikkepengene.",
    addEmployee: "Tilføj medarbejder",
    name: "Navn",
    factor: "Faktor",
    hours: "Timer",
    employee: "Medarbejder",
    total: "Total",
    back: "Tilbage",
    next: "Næste",
    changeInstructions: "Veksleinstruktioner",
    takeOut: "Tag fra byttepengene",
    addToChange: "Læg til byttepengene",
    leftoverTipMoney: "Drikkepenge tilbage",
    payoutInstructions: "Udbetalingsinstruktioner",
    totalPaidOut: "Udbetalt i alt",
    leaveInTipJar: "Lad blive i drikkepengekassen",
    nothing: "ingenting",
    pressCalculate: "Tryk på Beregn, når du har udfyldt oplysningerne.",
    errorEmployee: "Tilføj mindst én medarbejder med arbejdstimer.",
    errorTipMoney: "Indtast først drikkepengene.",
    errorWeightedHours: "Det samlede antal vægtede timer skal være større end nul.",
    errorChange: "Der er ikke nok byttepenge. Afrund til et større beløb eller sørg først for flere byttepenge.",
    errorBalance: "Byttepengene kan ikke balanceres med de tilgængelige drikkepenge.",
    errorOverChange: "Den ekstra vekslede difference kan ikke tages fra byttepengene.",
  },
  no: {
    languageName: "Norsk",
    chooseLanguage: "Velg språk",
    chooseLanguageText: "Velg språket du vil bruke i appen.",
    chooseCurrency: "Velg valuta",
    chooseCurrencyText: "Velg valuta for tips og vekselpenger.",
    employees: "Ansatte",
    employeesText: "Legg til alle som skal få tips. Faktor er valgfritt.",
    workedHours: "Arbeidstimer",
    workedHoursText: "Fyll inn antall arbeidstimer per ansatt.",
    tipMoney: "Tips",
    changeMoney: "Vekselpenger",
    roundOff: "Rund av",
    roundOffText: "Velg hvilket beløp utbetalingene skal rundes ned til.",
    calculate: "Beregn",
    calculateText: "Veksle først pengene som vist nedenfor, og betal deretter ut tipsen.",
    addEmployee: "Legg til ansatt",
    name: "Navn",
    factor: "Faktor",
    hours: "Timer",
    employee: "Ansatt",
    total: "Totalt",
    back: "Tilbake",
    next: "Neste",
    changeInstructions: "Vekslingsinstruksjoner",
    takeOut: "Ta ut fra vekselpengene",
    addToChange: "Legg til i vekselpengene",
    leftoverTipMoney: "Tips igjen",
    payoutInstructions: "Utbetalingsinstruksjoner",
    totalPaidOut: "Totalt utbetalt",
    leaveInTipJar: "La ligge i tipskassen",
    nothing: "ingenting",
    pressCalculate: "Trykk på Beregn etter at du har fylt inn nødvendig informasjon.",
    errorEmployee: "Legg til minst én ansatt med arbeidstimer.",
    errorTipMoney: "Legg inn tips først.",
    errorWeightedHours: "Totalt antall vektede timer må være større enn null.",
    errorChange: "Ikke nok vekselpenger tilgjengelig. Rund av til et større beløp eller skaff mer veksel først.",
    errorBalance: "Vekselpengene kan ikke balanseres med tilgjengelig tips.",
    errorOverChange: "Den ekstra vekslede differansen kan ikke tas ut fra vekselpengene.",
  },
} as const;

type Translation = typeof TRANSLATIONS.en;

type Employee = {
  name: string;
  hours: string;
  factor: string;
};

type MoneyMap = Record<string, string> & {
  unlimited?: string;
};

const defaultEmployees: Employee[] = [{ name: "", hours: "", factor: "1" }];

function getDenoms(currency: CurrencyKey) {
  return CURRENCIES[currency].denominations;
}

function getDenomCents(currency: CurrencyKey) {
  return getDenoms(currency).map((d) => Math.round(d * 100));
}

function emptyMoney(currency: CurrencyKey): MoneyMap {
  return Object.fromEntries(getDenoms(currency).map((d) => [String(d), ""]));
}

function money(value: number, currency: CurrencyKey) {
  const config = CURRENCIES[currency];
  return new Intl.NumberFormat(config.locale, {
    style: "currency",
    currency: config.code,
    minimumFractionDigits: 2,
  }).format(value);
}

function countsToArray(counts: MoneyMap, currency: CurrencyKey) {
  if (counts.unlimited === "true") {
    return getDenoms(currency).map(() => 50);
  }

  return getDenoms(currency).map((d) => Number(counts[String(d)]) || 0);
}


function valueOfArray(arr: number[], currency: CurrencyKey) {
  const denomCents = getDenomCents(currency);
  return arr.reduce((sum, count, i) => sum + count * denomCents[i], 0);
}

function textFromArray(arr: number[], currency: CurrencyKey, t: Translation) {
  const denoms = getDenoms(currency);
  const parts = arr
    .map((count, i) => (count > 0 ? `${count}x ${money(denoms[i], currency)}` : null))
    .filter(Boolean);

  return parts.length ? parts.join("; ") : t.nothing;
}

function greedySplit(amountCents: number, currency: CurrencyKey) {
  const denomCents = getDenomCents(currency);
  let rest = Math.round(amountCents);
  const result = Array(denomCents.length).fill(0);

  denomCents.forEach((denom, i) => {
    result[i] = Math.floor(rest / denom);
    rest -= result[i] * denom;
  });

  return result;
}

function canMakeWithSmaller(
  amount: number,
  startIndex: number,
  available: number[],
  needed: number[],
  currency: CurrencyKey
) {
  const denomCents = getDenomCents(currency);
  let remaining = amount;

  for (let i = startIndex; i < denomCents.length; i++) {
    const free = available[i] - needed[i];

    if (free > 0) {
      const use = Math.min(Math.floor(remaining / denomCents[i]), free);
      remaining -= use * denomCents[i];
    }
  }

  return remaining === 0;
}

function addSmaller(
  empIndex: number,
  amount: number,
  startIndex: number,
  distributions: number[][],
  needed: number[],
  available: number[],
  currency: CurrencyKey
) {
  const denomCents = getDenomCents(currency);
  let remaining = amount;

  for (let i = startIndex; i < denomCents.length; i++) {
    const free = available[i] - needed[i];

    if (free > 0) {
      const use = Math.min(Math.floor(remaining / denomCents[i]), free);

      if (use > 0) {
        distributions[empIndex][i] += use;
        needed[i] += use;
        remaining -= use * denomCents[i];
      }
    }

    if (remaining === 0) return true;
  }

  return remaining === 0;
}

function replaceDenom(index: number, distributions: number[][], needed: number[], available: number[], currency: CurrencyKey) {
  const denomCents = getDenomCents(currency);

  for (let emp = distributions.length - 1; emp >= 0; emp--) {
    if (distributions[emp][index] > 0) {
      for (let k = index + 1; k < denomCents.length; k++) {
        if (canMakeWithSmaller(denomCents[index], k, available, needed, currency)) {
          distributions[emp][index] -= 1;
          needed[index] -= 1;
          addSmaller(emp, denomCents[index], k, distributions, needed, available, currency);
          return true;
        }
      }
    }
  }

  return false;
}

function findBestAtLeast(target: number, available: number[], currency: CurrencyKey) {
  const denomCents = getDenomCents(currency);
  let bestValue = Infinity;
  let best: number[] | null = null;
  const temp = Array(denomCents.length).fill(0);

  function rec(idx: number, current: number) {
    if (current >= target) {
      if (current < bestValue) {
        bestValue = current;
        best = [...temp];
      }
      return;
    }

    if (idx >= denomCents.length || current >= bestValue) return;

    for (let k = available[idx]; k >= 0; k--) {
      temp[idx] = k;
      rec(idx + 1, current + k * denomCents[idx]);
    }

    temp[idx] = 0;
  }

  rec(0, 0);

  return best ? { counts: best, value: bestValue } : null;
}

function findExact(target: number, available: number[], currency: CurrencyKey) {
  const denomCents = getDenomCents(currency);
  const result = Array(denomCents.length).fill(0);

  function rec(idx: number, remaining: number): boolean {
    if (remaining === 0) return true;
    if (idx >= denomCents.length) return false;

    const max = Math.min(Math.floor(remaining / denomCents[idx]), available[idx]);

    for (let k = max; k >= 0; k--) {
      result[idx] = k;

      if (rec(idx + 1, remaining - k * denomCents[idx])) return true;
    }

    result[idx] = 0;
    return false;
  }

  return rec(0, target) ? result : null;
}

function calculate(
  employees: Employee[],
  tipMoney: MoneyMap,
  changeMoney: MoneyMap,
  roundTo: number,
  currency: CurrencyKey,
  t: Translation
) {
  const denoms = getDenoms(currency);
  const activeEmployees = employees.filter((e) => e.name.trim() && Number(e.hours) > 0);

  if (!activeEmployees.length) {
    throw new Error(t.errorEmployee);
  }

  const tip = countsToArray(tipMoney, currency);
  const change = countsToArray(changeMoney, currency);
  const available = tip.map((v, i) => v + change[i]);
  const totalTipCents = valueOfArray(tip, currency);
  const roundCents = Math.round(roundTo * 100);

  if (totalTipCents <= 0) {
    throw new Error(t.errorTipMoney);
  }

  const totalWeighted = activeEmployees.reduce((sum, e) => {
    const factor = Number(e.factor) || 1;
    return sum + Number(e.hours) * factor;
  }, 0);

  if (totalWeighted <= 0) {
    throw new Error(t.errorWeightedHours);
  }

  const payouts = activeEmployees.map((e) => {
    const factor = Number(e.factor) || 1;
    const raw = totalTipCents * ((Number(e.hours) * factor) / totalWeighted);
    return Math.floor(raw / roundCents) * roundCents;
  });

  const distributions = payouts.map((payout) => greedySplit(payout, currency));
  const needed = Array(denoms.length).fill(0);

  distributions.forEach((row) => {
    row.forEach((count, i) => {
      needed[i] += count;
    });
  });

  for (let i = 0; i < denoms.length - 1; i++) {
    while (needed[i] > available[i]) {
      if (!replaceDenom(i, distributions, needed, available, currency)) {
        throw new Error(t.errorChange);
      }
    }
  }

  const takeFromRegister = Array(denoms.length).fill(0);
  const leftoverTip = Array(denoms.length).fill(0);

  needed.forEach((count, i) => {
    if (count > tip[i]) takeFromRegister[i] = count - tip[i];
    else leftoverTip[i] = tip[i] - count;
  });

  const valueTaken = valueOfArray(takeFromRegister, currency);
  const stopSearch = findBestAtLeast(valueTaken, leftoverTip, currency);

  if (!stopSearch) {
    throw new Error(t.errorBalance);
  }

  const putInRegister = stopSearch.counts;
  const overChange = stopSearch.value - valueTaken;
  const changeAfterTake = change.map((v, i) => v - takeFromRegister[i]);
  const extraFromRegister = overChange > 0 ? findExact(overChange, changeAfterTake, currency) : Array(denoms.length).fill(0);

  if (!extraFromRegister) {
    throw new Error(t.errorOverChange);
  }

  extraFromRegister.forEach((count, i) => {
    takeFromRegister[i] += count;
  });

  const tipJar = leftoverTip.map((count, i) => count - putInRegister[i] + extraFromRegister[i]);

  return {
    employees: activeEmployees.map((e, i) => ({
      ...e,
      payout: payouts[i] / 100,
      instructions: textFromArray(distributions[i], currency, t),
    })),
    takeFromRegister,
    putInRegister,
    tipJar,
    totalPaid: payouts.reduce((a, b) => a + b, 0) / 100,
    leftover: (totalTipCents - payouts.reduce((a, b) => a + b, 0)) / 100,
    totalTip: totalTipCents / 100,
    tipPerHour: totalTipCents / 100 / totalWeighted,
  };
}

function MoneyInput({
  title,
  values,
  setValues,
  currency,
  t,
}: {
  title: string;
  values: MoneyMap;
  setValues: React.Dispatch<React.SetStateAction<MoneyMap>>;
  currency: CurrencyKey;
  t: Translation;
}) {
  const denoms = getDenoms(currency);
  const unlimited = values["unlimited"] === "true";
  const total = unlimited
  ? Infinity
  : denoms.reduce((sum, d) => sum + (Number(values[String(d)]) || 0) * d, 0);

  return (
    <div>
      <h1>{title}</h1>

      {title.includes(t.changeMoney) && (
        <div style={{ marginTop: "16px", marginBottom: "18px" }}>
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            <input
              type="checkbox"
              checked={unlimited}
              onChange={(e) =>
                setValues((prev) => ({
                  ...prev,
                  unlimited: e.target.checked ? "true" : "false",
                }))
              }
            />
            Unlimited change available
          </label>
        </div>
      )}
      
      <div style={{ display: "grid", gap: "10px", marginTop: "20px" }}>
        {!unlimited && denoms.map((d) => (
          <div
            key={d}
            style={{
              display: "grid",
              gridTemplateColumns: "110px 1fr",
              alignItems: "center",
              gap: "14px",
            }}
          >
            <label style={{ fontWeight: 700 }}>{money(d, currency)}</label>

            <input
              type="number"
              min="0"
              inputMode="numeric"
              value={values[String(d)] || ""}
              onChange={(e) =>
                setValues((prev) => ({
                  ...prev,
                  [String(d)]: e.target.value,
                }))
              }
              style={{
                width: "100%",
                maxWidth: "180px",
                border: "1px solid #cbd5e1",
                borderRadius: "10px",
                padding: "10px",
                fontSize: "16px",
                textAlign: "right",
                background: "white",
              }}
            />
          </div>
        ))}
      </div>

      <p className="total">
        {t.total}: {unlimited ? "Unlimited" : money(total, currency)}
      </p>
    </div>
  );
}

export default function App() {
  const [language, setLanguage] = useState<LanguageKey>("en");
  const t = TRANSLATIONS[language];
  const [currency, setCurrency] = useState<CurrencyKey>("EUR");
  const [step, setStep] = useState(0);
  const [employees, setEmployees] = useState<Employee[]>(defaultEmployees);
  const [tipMoney, setTipMoney] = useState<MoneyMap>(() => emptyMoney("EUR"));
  const [changeMoney, setChangeMoney] = useState<MoneyMap>(() => emptyMoney("EUR"));
  const [roundTo, setRoundTo] = useState(CURRENCIES.EUR.roundOptions[0]);
  const [error, setError] = useState("");
  const [calculated, setCalculated] = useState(false);

  const result = useMemo(() => {
    if (!calculated) return null;

    try {
      return calculate(employees, tipMoney, changeMoney, roundTo, currency, t);
    } catch {
      return null;
    }
  }, [employees, tipMoney, changeMoney, roundTo, currency, calculated, t]);

  const steps = [
    t.chooseLanguage,
    t.chooseCurrency,
    t.employees,
    t.workedHours,
    t.tipMoney,
    t.roundOff,
    t.changeMoney,
    t.calculate,
  ];

  function handleCurrencyChange(nextCurrency: CurrencyKey) {
    setCurrency(nextCurrency);
    setTipMoney(emptyMoney(nextCurrency));
    setChangeMoney(emptyMoney(nextCurrency));
    setRoundTo(CURRENCIES[nextCurrency].roundOptions[0]);
    setCalculated(false);
    setError("");
  }

  function handleLanguageChange(nextLanguage: LanguageKey) {
    setLanguage(nextLanguage);
    setCalculated(false);
    setError("");
  }

  function next() {
    setStep((s) => Math.min(7, s + 1));
  }

  function back() {
    setStep((s) => Math.max(0, s - 1));
  }

  function run() {
    try {
      calculate(employees, tipMoney, changeMoney, roundTo, currency, t);
      setError("");
      setCalculated(true);
      setStep(7);
    } catch (e: any) {
      setCalculated(false);
      setError(e.message);
      setStep(7);
    }
  }

  return (
    <div className="app">
      <style>{`
        body {
          margin: 0;
          font-family: Inter, Arial, sans-serif;
          background: #f4f7fb;
          color: #102033;
        }

        .app {
          min-height: 100vh;
          padding: 20px;
          box-sizing: border-box;
        }

        .container {
          max-width: 620px;
          margin: 0 auto;
        }

        .tabs {
          display: flex;
          gap: 8px;
          overflow-x: auto;
          margin-bottom: 16px;
          padding-bottom: 6px;
        }

        .tab {
          border: none;
          border-radius: 999px;
          padding: 9px 13px;
          background: white;
          color: #334155;
          font-weight: 700;
          white-space: nowrap;
          box-shadow: 0 1px 4px rgba(0,0,0,.08);
        }

        .tab.active {
          background: #3182ce;
          color: white;
        }

        .card {
          background: white;
          border-radius: 24px;
          padding: 22px;
          box-shadow: 0 8px 30px rgba(15, 23, 42, 0.12);
          overflow: hidden;
        }

        h1 {
          font-size: 26px;
          margin: 0 0 8px;
        }

        h2 {
          font-size: 22px;
          margin: 0 0 16px;
        }

        p {
          color: #526173;
        }

        input, select {
          border: 1px solid #d6e1ee;
          border-radius: 12px;
          padding: 11px;
          font-size: 16px;
          box-sizing: border-box;
          background: white;
        }

        input:focus, select:focus {
          outline: 2px solid #93c5fd;
          border-color: #3182ce;
        }

        .employee-row, .hour-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 10px;
        }

        .employee-row input:first-child {
          flex: 1;
        }

        .employee-row input:last-child {
          width: 82px;
          text-align: right;
        }

        .hour-row span {
          flex: 1;
          font-weight: 700;
        }

        .hour-row input {
          width: 120px;
          text-align: right;
        }

        .buttons {
          display: flex;
          justify-content: space-between;
          margin-top: 24px;
          gap: 12px;
        }

        button {
          cursor: pointer;
        }

        .primary, .secondary, .danger {
          border: none;
          border-radius: 14px;
          padding: 12px 16px;
          font-weight: 800;
          font-size: 15px;
        }

        .primary {
          background: #3182ce;
          color: white;
        }

        .secondary {
          background: #e8eef6;
          color: #102033;
        }

        .danger {
          background: #fee2e2;
          color: #991b1b;
        }

        .choice-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 10px;
          margin-top: 20px;
        }

        .choice-card {
          border: 1px solid #d6e1ee;
          border-radius: 16px;
          padding: 14px;
          background: white;
          text-align: left;
          font-weight: 800;
        }

        .choice-card.active {
          border-color: #3182ce;
          background: #eff6ff;
          color: #1d4ed8;
        }

        .result-box {
          background: #eff6ff;
          border-radius: 18px;
          padding: 15px;
          margin-bottom: 16px;
        }

        .person-card {
          border: 1px solid #e2e8f0;
          border-radius: 18px;
          padding: 14px;
          margin-bottom: 10px;
          background: #ffffff;
        }

        .person-head {
          display: flex;
          justify-content: space-between;
          font-weight: 800;
          margin-bottom: 8px;
        }

        .error {
          background: #fef2f2;
          color: #991b1b;
          padding: 14px;
          border-radius: 16px;
          font-weight: 700;
        }

        .total {
          background: #f1f5f9;
          border-radius: 16px;
          padding: 12px;
          font-weight: 800;
          color: #102033;
        }

        .summary {
          background: #f8fafc;
          border-radius: 18px;
          padding: 15px;
          margin-top: 14px;
          font-weight: 800;
        }

        .summary div {
          display: flex;
          justify-content: space-between;
          margin: 6px 0;
        }

        @media (max-width: 600px) {
          .app {
            padding: 12px;
          }

          .container {
            width: 100%;
            max-width: 100%;
          }

          .tabs {
            gap: 6px;
            overflow-x: auto;
            padding-bottom: 6px;
          }

          .tab {
            font-size: 13px;
            padding: 8px 10px;
            flex-shrink: 0;
          }

          .card {
            padding: 18px;
            border-radius: 20px;
          }

          h1 {
            font-size: 22px;
          }

          h2 {
            font-size: 18px;
          }

          .employee-row {
            display: grid;
            grid-template-columns: 1fr 75px 44px;
            gap: 8px;
            width: 100%;
          }

          .employee-row input:first-child {
            min-width: 0;
            width: 100%;
          }

          .employee-row input:last-child {
            width: 100%;
          }

          .hour-row {
            display: grid;
            grid-template-columns: 1fr 100px;
            gap: 10px;
            width: 100%;
          }

          .hour-row span {
            min-width: 0;
          }

          input,
          select {
            min-width: 0;
            width: 100%;
            font-size: 16px;
          }

          .buttons {
            position: sticky;
            bottom: 0;
            background: white;
            padding-top: 14px;
            margin-top: 20px;
          }

          .primary,
          .secondary,
          .danger {
            font-size: 14px;
            padding: 11px 14px;
          }

          .person-head {
            gap: 10px;
            flex-wrap: wrap;
          }
        }
      `}</style>

      <div className="container">
        <div className="tabs">
          {steps.map((s, i) => (
            <button key={`${s}-${i}`} className={`tab ${step === i ? "active" : ""}`} onClick={() => setStep(i)}>
              {i + 1}. {s}
            </button>
          ))}
        </div>

        <div className="card">
          {step === 0 && (
            <>
              <h1>1. {t.chooseLanguage}</h1>
              <p>{t.chooseLanguageText}</p>

              <div className="choice-grid">
                {(Object.keys(TRANSLATIONS) as LanguageKey[]).map((key) => (
                  <button
                    key={key}
                    className={`choice-card ${language === key ? "active" : ""}`}
                    onClick={() => handleLanguageChange(key)}
                  >
                    {TRANSLATIONS[key].languageName}
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <h1>2. {t.chooseCurrency}</h1>
              <p>{t.chooseCurrencyText}</p>

              <div className="choice-grid">
                {(Object.keys(CURRENCIES) as CurrencyKey[]).map((key) => (
                  <button
                    key={key}
                    className={`choice-card ${currency === key ? "active" : ""}`}
                    onClick={() => handleCurrencyChange(key)}
                  >
                    {key} — {CURRENCIES[key].label}
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h1>3. {t.employees}</h1>
              <p>{t.employeesText}</p>

              {employees.map((emp, index) => (
                <div className="employee-row" key={index}>
                  <input
                    placeholder={t.name}
                    value={emp.name}
                    onChange={(e) => {
                      const nextEmployees = [...employees];
                      nextEmployees[index].name = e.target.value;
                      setEmployees(nextEmployees);
                    }}
                  />

                  <input
                    placeholder={t.factor}
                    value={emp.factor}
                    onChange={(e) => {
                      const nextEmployees = [...employees];
                      nextEmployees[index].factor = e.target.value;
                      setEmployees(nextEmployees);
                    }}
                  />

                  <button className="danger" onClick={() => setEmployees(employees.filter((_, i) => i !== index))}>
                    ×
                  </button>
                </div>
              ))}

              <button className="primary" onClick={() => setEmployees([...employees, { name: "", hours: "", factor: "1" }])}>
                {t.addEmployee}
              </button>
            </>
          )}

          {step === 3 && (
            <>
              <h1>4. {t.workedHours}</h1>
              <p>{t.workedHoursText}</p>

              {employees.map((emp, index) => (
                <div className="hour-row" key={index}>
                  <span>{emp.name || `${t.employee} ${index + 1}`}</span>
                  <input
                    type="number"
                    step="0.25"
                    placeholder={t.hours}
                    value={emp.hours}
                    onChange={(e) => {
                      const nextEmployees = [...employees];
                      nextEmployees[index].hours = e.target.value;
                      setEmployees(nextEmployees);
                    }}
                  />
                </div>
              ))}
            </>
          )}

          {step === 4 && <MoneyInput title={`5. ${t.tipMoney}`} values={tipMoney} setValues={setTipMoney} currency={currency} t={t} />}

          {step === 5 && (
            <>
              <h1>6. {t.roundOff}</h1>
              <p>{t.roundOffText}</p>

              <select value={roundTo} onChange={(e) => setRoundTo(Number(e.target.value))}>
                {CURRENCIES[currency].roundOptions.map((option) => (
                  <option key={option} value={option}>
                    {money(option, currency)}
                  </option>
                ))}
              </select>
            </>
          )}

          {step === 6 && <MoneyInput title={`7. ${t.changeMoney}`} values={changeMoney} setValues={setChangeMoney} currency={currency} t={t} />}

          {step === 7 && (
            <>
              <h1>8. {t.calculate}</h1>
              <p>{t.calculateText}</p>

              {error && <div className="error">{error}</div>}

              {!error && !result && <div className="error">{t.pressCalculate}</div>}

              {!error && result && (
                <>
                  <div className="result-box">
                    <h2>{t.changeInstructions}</h2>
                    <p>
                      <strong>{t.takeOut}:</strong> {textFromArray(result.takeFromRegister, currency, t)}
                    </p>
                    <p>
                      <strong>{t.addToChange}:</strong> {textFromArray(result.putInRegister, currency, t)}
                    </p>
                    <p>
                      <strong>{t.leftoverTipMoney}:</strong> {textFromArray(result.tipJar, currency, t)}
                    </p>
                  </div>

                  <h2>{t.payoutInstructions}</h2>

                  {result.employees.map((emp) => (
                    <div className="person-card" key={emp.name}>
                      <div className="person-head">
                        <span>{emp.name}</span>
                        <span>{money(emp.payout, currency)}</span>
                      </div>
                      <div>{emp.instructions}</div>
                    </div>
                  ))}

                  <div className="summary">
                    <div>
                      <span>{t.totalPaidOut}</span>
                      <span>{money(result.totalPaid, currency)}</span>
                    </div>
                    <div>
                      <span>{t.leaveInTipJar}</span>
                      <span>{money(result.leftover, currency)}</span>
                    </div>
                  </div>
                </>
              )}
            </>
          )}

          <div className="buttons">
            <button className="secondary" onClick={back} disabled={step === 0}>
              {t.back}
            </button>

            {step < 7 ? (
              <button className="primary" onClick={next}>
                {t.next}
              </button>
            ) : (
              <button className="primary" onClick={run}>
                {t.calculate}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
