SET NAMES utf8;

INSERT INTO `WeeklyGoalCategory` (`id`, `parentId`, `name`) VALUES
	(1, NULL, 'Bewusste Ernährung'),
	(2, NULL, 'Aktiv und Fit'),
	(3, NULL, 'Entspannung und Wohlbefinden'),
	(4, NULL, 'Familie und Freunde'),

	(5, 1, 'Vitamin Power'),
	(6, 1, 'Süß und Salzig'),
	(7, 1, 'Auf zum Wohlfühlgewicht'),
	(8, 1, 'Obst und Gemüse'),
	(9, 1, 'Getränke'),

	(10, 2, 'Auf zum Wohlfühlgewicht'),
	(11, 2, 'Fit@Work'),
	(12, 2, 'Fit im Alltag'),

	(13, 3, 'Schlafen & Erholung'),
	(14, 3, 'Stressfrei durch den Tag'),
	(15, 3, 'Denk an Dich'),

	(16, 4, 'Deine Familie und Freunde'),
	(17, 4, 'Dein Kollegium');

INSERT INTO `WeeklyGoal` (`categoryId`, `title`, `description`) VALUES
	(5, 'Vitamin-C-Power', 'Nimm ein Lebensmittel mit besonders hohem Vitamin C Gehalt zu Dir (z.B. Petersilie, Paprika, schwarze Johannisbeeren, Kiwi, Erdbeere)'),
	(5, 'Vitamin-E-Power', 'Nimm ein Lebensmittel mit besonders hohem Vitamin E Gehalt zu Dir (z.B. Nüsse, Avocado, Raps- und Sonnenblumenöl)'),
	(5, 'Vitamin-D-Power', 'Gönne Dir einen kurzen Spaziergang und stille über das Sonnenlicht Deinen Bedarf an Vitamin D. Fettige Fischsorten enthalten ebenfalls Vitamin D.'),

	(6, 'Ohne Soft geht´s auch', 'Gib den Softdrinks einen Korb und verzichte auf den Konsum von Cola und Co.'),
	(6, 'Keine Chance den Süßigkeiten', 'Fordere Dich heraus und verzichte auf Süßigkeiten wie Schokolade, Kuchen oder Fruchtgummi.'),
	(6, 'Salzgebäck Adé', 'Fordere Dich heraus und verzichte auf salziges Knabbergebäck wie Chips, Kracker oder Salzstangen.'),
	(6, 'Die inneren Werte zählen', 'Miss Deinen Blutdruck und notiere die Ergebnisse. Beachte: Ein tendenziell hoher Bluthochdruck liegt bei einem systolischen Wert von über 140 und einem diastolischen Wert von über 90 vor.'),
	(6, 'Lust auf Neues?', 'Probiere am besten mit Freunden und der Familie neue Gerichte aus, die wenig Zucker und Salz enthalten oder in denen alternative Gewürze (z.B. Stevia) zum Einsatz kommen.'),
	(6, 'Mission Einkaufszettel', 'Wähle beim nächsten Einkauf Lebensmittel (z.B. Brot, Brötchen) mit einem geringeren Salzgehalt.'),

	(7, 'Gewohnheiten entdecken', 'Notiere jede noch so kleine Mahlzeit und überlege, in welcher Stimmung du sie einnimmst.'),
	(7, 'Halb 10 in Deutschland', 'Anstatt zum Schokoriegel greifst Du zu einer gesunden Zwischenmahlzeit (ein zuckerarmes Müsli).'),
	(7, 'Messe Dich!', 'Stell Dich morgens auf die Waage und überlege, was Du am Vortag gegessen hast.'),
	(7, 'Stimmungskanone Sport?', 'Egal was Du machst, notiere immer nach dem Sport, wie Du Dich fühlst.'),
	(7, 'Der frühe Vogel', 'Versuche, Dein Abendbrot nicht nach 18 Uhr einzunehmen. Dein Körper wird es Dir danken!'),
	(7, 'Veggie Star', 'Fordere Dich heraus und probiere heute statt Fisch und Fleisch einmal Alternativen wie Tofu, Seitan oder Quorn.'),
	(7, 'Kohlenhydrate Adé', 'Probiere heute einmal Alternativen zu Nudeln, Reis und Kartoffeln (z.B. Gemüsepüree)'),

	(8, 'Bring Farbe auf den Tisch', 'Kaufe beim nächsten Mal Obst und Gemüse in 3 unterschiedlichen Farben.'),
	(8, 'Fruit Fighter', 'Iss mindestens 3 Portionen Obst am Tag! (Beachte: eine Portion ist ungefähr eine Handvoll).'),
	(8, 'Grün muss sein', 'Versuche zu jeder Mittagsmahlzeit mindestens einen kleinen Salat zu essen.'),
	(8, 'Obst gegen Süßes', 'Versuche jede Süßigkeit gegen ein Stück Obst zu ersetzen'),

	(9, 'Ohne Soft geht´s auch', 'Gib den Softdrinks einen Korb und verzichte auf den Konsum von Cola und Co.'),
	(9, 'Wasser marsch!', 'Trinke mindestens 1,5 Liter Wasser oder ungesüßten Tee am Tag.'),
	(9, 'Hoch den Becher', 'Trinke zu jeder Hauptmahlzeit ein Glas Wasser oder ungesüßten Tee.'),
	(9, 'Spaß ohne Alkohol', 'Trinke maximal ein Bier oder ein Glas Wein am Tag.'),

	(10, 'Gewohnheiten entdecken', 'Notiere jede noch so kleine Mahlzeit und überlege, in welcher Stimmung du sie einnimmst.'),
	(10, 'Halb 10 in Deutschland', 'Anstatt zum Schokoriegel greifst Du zu einer gesunden Zwischenmahlzeit (ein zuckerarmes Müsli).'),
	(10, 'Messe Dich!', 'Stell Dich morgens auf die Waage und überlege, was Du am Vortag gegessen hast.'),
	(10, 'Stimmungskanone Sport?', 'Egal was Du machst, notiere immer nach dem Sport, wie Du Dich fühlst.'),
	(10, 'Der frühe Vogel', 'Versuche, Dein Abendbrot nicht nach 18 Uhr einzunehmen. Dein Körper wird es Dir danken!'),

	(11, 'Energy Walk', 'Unternimm in der Pause einen kurzen Spaziergang, um alleine oder mit KollegInnen frische Luft und Energie zu tanken.'),
	(11, 'Dem Himmel entgegen', 'Strecke Dich pro Tag mindestens zweimal. Stelle Dich hierfür aufrecht hin, mach Dich so groß wie es geht und strecke Deine Arme so weit wie möglich nach oben. Halte diese Spannung für einige Sekunden und wiederhole die Übung zwei Mal.'),
	(11, 'Treppenlauf', 'Fordere Dich heraus und nutze den gesamten Tag die Treppe statt den Aufzug.'),
	(11, 'Vorwärts Marsch', 'Setze Dich gerade in Dein Bürostuhl und bewege Dich mit den Füßen einen Meter vor und zurück und anschließend nach links und nach rechts. Mache dies insgesamt zwei Mal.'),
	(11, 'Klopf Dich aus', 'Stell Dich gerade hin und klopfe Deinen Körper mit beiden Händen. Beginne bei den Armen und gehe über den Oberkörper zu den Beinen und wieder zurück.'),
	(11, 'Kreisende Gelenke', 'Setze Dich aufrecht hin und führe mit Deinen Füßen, Deinen Beinen und anschließend Deinen Schultern jeweils 5 kreisende Bewegungen aus.'),

	(12, 'Sensation Körper', 'Nimm Dir zwei Minuten Zeit und schließe die Augen, um Dich und Deinen Körper zu spüren.'),
	(12, 'Der Fitnesscoach', 'Verabrede Dich mit Personen, von denen Du weißt, dass sie sehr fit sind, zum gemeinsamen Sport.'),
	(12, 'Neue Aktivitäten', 'Überlege Dir, welche Sportart Dich schon immer interessiert hat und probiere sie einfach aus.'),
	(12, 'Mehr zu Fuß', 'Steige eine Bus- oder Bahnhaltestelle früher aus und gehe den Rest der Strecke zu Fuß.'),
	(12, 'Autofrei', 'Lass das Auto stehen und fahre mindestens eine typische Autorstrecke mit dem Fahrrad.'),
	(12, 'An alles gedacht', 'Nimm Deine Sportsachen direkt mit zur Arbeit, damit Du nach Dienstschluss ohne Umwege aktiv sein kannst.'),

	(13, 'Erholung pur', 'Versuche mindestens acht Stunden Schlaf am Tag zu bekommen.'),
	(13, 'Flimmerfrei ins Bett', 'Versuche mindestens eine halbe Stunde vor dem Schlafen alle Geräte mit Bildschirm auszuschalten (PC, Fernseher, Smartphone).'),
	(13, 'Aus den Federn', 'Stelle den Wecker lieber 5 Minuten später anstatt mehrfach auf die Schlummertaste zu drücken.'),
	(13, 'Chill & Relax', 'Recherchiere im Internet Möglichkeiten zur Entspannung und probiere hiervon etwas Neues aus.'),

	(14, 'Lehn Dich zurück', 'Warte 10 Minuten, bevor Du auf eine E-Mail, SMS oder Nachricht antwortest, die Dich ärgert.'),
	(14, 'Gib den Newslettern einen Korb', 'Befreie Dich von unnützen Newslettern, in dem Du dich einfach hiervon abmeldest.'),
	(14, 'Stressbrille', 'Notiere am Ende des Tages, wann und warum Du Dich gestresst gefühlt hast. Fällt Dir ein Muster auf?'),
	(14, 'Schulterklopfen', 'Bevor Du eine neue Aufgabe beginnst, denkst Du an all die Dinge, die Du bereits bewältigt hast und notierst, was Dir dabei geholfen hat.'),
	(14, 'Durchatmen', 'Atme drei Mal bewusst tief ein und aus, wenn Du wieder viel um die Ohren hast. Spüre wie Du Dich dabei entspannst.'),
	(14, 'Organisiere Dich', 'Lege einen Tagesplan fest und arbeite diesen Schritt für Schritt ab, um nicht in Stress zu geraten.'),
	(14, 'Sensation Körper', 'Nimm Dir zwei Minuten Zeit und schließe die Augen, um dich und deinen Körper zu spüren.'),

	(15, 'Freiraum', 'Hol Deinen Kalender raus und plane mindestens eine halbe Stunde für persönliche Aktivitäten ein.'),
	(15, 'Dein Tag', 'Lasse Deinen Tag Revue passieren und notiere drei Dinge, die Dich erfreut und Spaß gemacht haben.'),
	(15, 'Schöne Erinnerungen', 'Verbringe einen kurzen Moment an Stellen zu Hause, mit denen Du schöne Erinnerungen verbindest (auf dem Balkon, in der Küche).'),
	(15, 'Frühaufsteher', 'Stelle Deinen Wecker 10 Minuten früher als sonst, um am Morgen mehr Zeit für Dich (Zeitunglesen, Frühstück) zu haben.'),
	(15, 'Zeit für Pausen', 'Nimm Dir Zeit für Deine Pausen und schalte den PC aus oder lege den Stift aus der Hand.'),
	(15, 'Say No', 'Bleib eisern, indem Du bei Dingen, die Dir nicht gut tun auch einmal Nein sagst und dies auch begründest.'),

	(16, 'Kontakte auffrischen', 'Melde Dich bei Freunden oder Bekannten, die Du schon eine Zeitlang nicht mehr gesehen hast.'),
	(16, 'Kleine Freuden', 'Erfreue Deine Familie oder Freunde mit einer kleinen Aufmerksamkeit (z.B. einen Zettel auf dem Tisch, ein Dankeschön).'),
	(16, 'Der Fitnesscoach', 'Verabrede Dich mit Personen, von denen Du weißt, dass sie sehr fit sind, zum gemeinsamen Sport.'),
	(16, 'Zeit zu zweit', 'Plane eine kleine Unternehmung (z.B. Kino, Restaurant) mit Deinem/er Liebsten.'),
	(16, 'Kontaktliste', 'Bringe Deine privaten Adress- und Kontaktlisten (z.B. Telefon, Facebook) auf Vordermann. Vielleicht eine gute Gelegenheit sich bei alten Freunden zu melden?!'),

	(17, 'Fahrgemeinschaft', 'Alleine zur Arbeit? Das muss nicht sein. Bilde eine Fahrgemeinschaft und fahre gemeinsam mit KollegInnen zur Arbeit.'),
	(17, 'After Work', 'Initiiere eine gemeinsame Aktivität mit dem Kollegium nach der Arbeit (z.B. etwas Essen gehen, Bowling).'),
	(17, 'Alte KollegInnen', 'Überlege, mit wem Du in der Vergangenheit gerne zusammengearbeitet hast und melde Dich bei ihm oder ihr spontan.'),
	(17, 'Kontaktliste', 'Bringe Deine beruflichen Adress- und Kontaktlisten auf Vordermann. Vielleicht eine gute Gelegenheit sich bei alten KollegInnen zu melden?!'),
	(17, 'Alltäglichkeiten schätzen', 'Erfreue die Menschen, mit denen Du täglich zusammenarbeitest mit einer kleinen Aufmerksamkeit (z.B. ein Dankeschön für das Kantinenpersonal oder die Putzfrau).');


INSERT INTO `Level` (`name`, `id`, `nextId`, `pointsStart`, `pointsEnd`, `lat`, `lng`) VALUES
  ('Shanghai',       16,  NULL, 30000, NULL,  31.2243489,  121.4767528),
  ('Neu Delhi',      15,    16, 26250, 29999, 28.6469655,  77.0932634 ),
  ('Dubai',          14,    15, 22750, 26249, 25.073858,   55.2298444 ),
  ('Kilimandscharo', 13,    14, 19500, 22749, -3.0674246,  37.3556273 ),
  ('Kapstadt',       12,    13, 16500, 19499, -33.9149861, 18.6560594 ),
  ('Athen',          11,    12, 13750, 16499, 37.9908372,  23.7383394 ),
  ('Paris',          10,    11, 11250, 13749, 48.8588589,  2.3470599  ),
  ('London',          9,    10, 9000,  11249, 51.5286416,  -0.1015987 ),
  ('Amsterdam',       8,     9, 7000,  8999,  52.3747158,  4.8986142  ),
  ('Oslo',            7,     8, 5250,  6999,  59.8938549,  10.7851165 ),
  ('Stockholm',       6,     7, 3750,  5249,  59.326142,   17.9875454 ),
  ('Vilnius',         5,     6, 2500,  3749,  54.700171,   25.2529321 ),
  ('Kopenhagen',      4,     5, 1500,  2499,  55.6712674,  12.5608388 ),
  ('Berlin',          3,     4, 750,   1499,  52.5075419,  13.4251364 ),
  ('Bahnhof',         2,     3, 250,   749,   52.391704,   13.066782  ),
  ('Hotel',           1,     2, 0,     249,   52.4283616,  13.0274123 );

INSERT INTO `Quiz` (`title`, `dayAt`, `question1`, `answer1A`, `answer1B`, `answer1C`, `answer1D`, `solution1`, `info1`, `question2`, `answer2A`, `answer2B`, `answer2C`, `answer2D`, `solution2`, `info2`, `question3`, `answer3A`, `answer3B`, `answer3C`, `answer3D`, `solution3`, `info3`) VALUES
  (
    'Humor und Lachen', '2015-06-25',
        'Welches Hormon wird beim Lachen ausgeschüttet?', 'Endorphin', 'Kortisol', 'Östrogen', 'Adrenalin', 1, 'Beim Lachen werden die Stresshormone im Blut (Adrenalin und Kortisol) reduziert. Glückshormone (Endorphine) werden ausgeschüttet und Entspannung setzt ein.',
        'Wie viele Muskeln werden beim Lachen genutzt?', '37', '59', '80', '20', 3, 'Wenn ein Mensch lacht, werden in der Gesichtsregion 17 und am ganzen Körper sogar 80 Muskeln genutzt. Während die Bauchmuskulatur dabei angespannt ist, wird die Beinmuskulatur entspannt.',
        'Welche Wirkung haben Lachen und Humor auf den Körper?', 'senkt die Fähigkeit, Alkohol aufzunehmen', 'führt zu mehr Appetit', 'erhöht den Blutfluss und die Immunabwehr', 'alle der genannten', 3, 'Lachen und Humor haben positive Wirkungen auf die Gesundheit: Studien zeigen, dass dadurch Stress, Blutdruck und Herzrate abnehmen können. Also: heute schon gelacht? '
  ),
  (
    'Flüßigkeiten und Trinken', '2015-06-26',
        'Wie viel Flüssigkeit sollte ein erwachsener Mensch am Tag zu sich nehmen?', '1,5 l', '2,5 l', '3 l', '1 l', 1, 'Grundsätzlich gilt, dass man entsprechend des eigenen Durstgefühls trinken sollte. Als Richtwert empfiehlt die deutsche Gesellschaft für Ernährung 1,5 l pro Tag, an heißen Tagen bis zu 3 l.',
        'Der menschliche Körper besteht zu circa 70 % aus Wasser. Ab welchem Flüssigkeitsdefizit kann es zu einer Verringerung von Ausdauer- und Denkfähigkeit kommen?', 'ab 4 %', 'ab 8 %', 'ab 2%', 'ab 10%', 3, 'Bereits bei einem Flüssigkeitsdefizit von 2 % kann es zu einer Verminderung der Ausdauer und der Denkfähigkeit kommen. Lebensbedrohlich wird jedoch erst ein Defizit von 10 bis 15 %.',
        'Welche Getränke sind für Freizeitsportler geeignet?', 'isotonische Getränke', 'Mineralwasser und Saftschorlen', 'Kaffee, Cola, Koffeingetränke', 'Limonaden und Nektare', 2, 'Nur für Leistungssportler, die länger als 3 h pro Tag aktiv sind, machen isotonische Getränke wirklich Sinn. Freizeitsportler gleichen ihren Wasserhaushalt am besten mit Mineralwasser oder Saftschorlen aus.'
  ),
  (
    'Gesund in Berlin', '2015-06-27',
        'Wieviel Kalorien hat eine Portion Currywurst mit Pommes Frites?', '1060 kcal', '705 kcal', '825 kcal', '495 kcal', 3, 'Mit etwa 825 kcal gehört eine Portion Currywurst mit Pommes Frites zu den kalorienreichen Mahlzeiten. Der Fettanteil liegt mit 64 Gramm ebenfalls eher im oberen Bereich. Jedoch ist ein völliger Verzicht nicht nötig, vielmehr ist ein seltener und bewusster Genuss angeraten.',
        'Wieviel vegetarische Restaurants und Lokale gibt es in Berlin?', 'über 60', 'unter 20', 'etwa 90', 'etwa 30', 1, 'Berlin ist mit Abstand die vegetarierfreundlichste Stadt Deutschlands. Mit über 60 veganen und vegetarischen Gourmetrestaurants, Imbissständen, Fastfood-Lokalen, Eisdielen und Cafés bietet die Hauptstadt alles, was man sich nur wünschen kann.',
        'Wie lang ist der Flaeming-Skate vor den Toren Berlins?', '230 km', '150 km', '75 km', '370 km', 1, 'Etwa 50 km von Berlin entfernt liegt der Naturpark Flaeming verlaufen auf rund 230 Kilometern der Flaeming-Skate durch Wälder, Wiesen und Felder, fernab von störendem Straßenverkehr. Die zwei bis drei Meter breite Bahn aus feinstem Asphalt erlauben zahlreiche sportliche Aktivitäten.'
  ),
  (
    'Cholesterin', '2015-06-28',
        'Was wird auch als "schlechtes Cholesterin" bezeichnet?', 'FDH-Cholesterin', 'HDL-Cholesterin', 'LDL-Cholesterin', 'Cholesterin ist generell schlecht', 3, 'Das so genannte „schlechte” LDL-Cholesterin bringt das Fett in alle Körpergewebe. Unter bestimmten Umständen lagert sich das LDL-Cholesterin an den Gefäßwänden ab und es kann zu Gefäßverengungen kommen.',
        'Wieviel Cholesterin sollte man täglich maximal zu sich nehmen?', '250-300 mg', '450-500 mg', '650-700 mg', '850-900 mg', 1, '100 g Ei enthalten bereits 370 mg Cholesterin. Die Deutsche Herzstiftung empfiehlt vor allem Lebensmittel der Mittelmeerküche, die sich durch ihre einfach ungesättigten Fettsäuren günstig auf die Cholesterinwerte ausüben.',
        'Welches Lebensmittel enthält am wenigsten Cholesterin?', 'Salami', 'Hühnerei', 'Leberwurst', 'Camembert', 4, 'In der Tat hat das normale Ei mit rund 370 mg pro 100g den höchsten Cholesteringehalt. Die Leberwurst schlägt mit ebenfalls stolzen 205 mg zu Buche, die Salami mit 80 mg und Camembert mit gerade einmal 30 mg.'
  ),
  (
    'Stress lass nach', '2015-06-29',
        'Welches sind direkte Stresssymptome?', 'schnelle Herzfrequenz', 'schwindender Appetit', 'Schwitzen', 'alle drei', 4, 'Tatsächlich kann Stress zu allen genannten Symptomen führen. Diese Symptome werden durch Hormone hervorgerufen, die unsere Vorahnen darin unterstützten, Bedrohungen und Unsicherheiten zu bewältigen.',
        'Welches sind langfristige Stresssymptome?', 'Konzentrationsschwierigkeiten', 'Müdigkeit', 'Depression', 'alle drei', 4, 'Stress kann, wenn er dauerhaft besteht, zu Müdigkeit, Gereiztheit oder gar zur Entstehung von Erkrankungen wie Depression beitragen. Deshalb ist es wichtig, Stresssymptome möglichst frühzeitig wahrzunehmen und Maßnahmen zur Bewältigung zu ergreifen.',
        'Stress führt zu verfrühter Alterung durch...', 'zunehmende Isolation', 'die Entstehung von Falten', 'Beeinflussung des Immunsystems', 'mangelnde Aufnahme von Vitaminen', 3, 'Stress führt zur Beeinflussung des Immunsystems, indem es Herz-Kreislauf-Erkrankungen, Osteoporose oder bestimmte Krebserkrankungen begünstigt und darüber zur Alterung beiträgt.'
  ),
  (
    'Bewegung', '2015-06-30',
        'Wieviel Schritte sollte man pro Tag gehen?', '6.000', '10.000', '8.000', '12.000', 2, 'Grundsätzlich gilt das Prinzip “je mehr, desto besser”, d.h. je mehr Schritte am Tag gegangen werden, desto gesundheitsförderlicher ist dies. Ab 10.000 Schritten am Tag sprechen Wissenschaftler von einem aktiven Gesundheitsverhalten.',
        'Wie stark sollten sich Erwachsene körperlich bewegen?', 'mind. 45 Min. mäßig-intensive Bewegung an 2 Tagen/Woche', 'mind. 30 Min. mäßig-intensive Bewegung an 5 Tagen/Woche', 'mind. 15 Min. mäßig-intensive Bewegung an 7 Tagen/Woche', 'mind. 60 Min. mäßig-intensive Bewegung an 3 Tagen/Woche', 2, 'Basierend auf den Empfehlungen der Weltgesundheitsorganisation sollten sich Erwachsene an 5 Tagen in der Woche für mind. 30 Min. mäßig bis intensiv bewegen. Alternativ gilt auch eine intensive körperliche Betätigung (z.B. schnelles Joggen) für 20 Minuten an 3 Tagen in der Woche als ausreichend.',
        'Wieviel Prozent der deutschen Erwachsenen sind weniger als 2,5 Stunden pro Woche körperlich aktiv?', 'mehr als 75%', 'etwa als 25%', 'etwa 50%', 'weniger als 10%', 1, 'In der Tat erfüllen mehr als Dreiviertel aller Erwachsenen die Bewegungsempfehlungen nicht. Dies gilt insbesondere für Frauen, hier sind es sogar 85%.'
  ),
  (
    'Kalorien', '2015-07-01',
        'Welches der folgenden Lebensmittel hat die meisten Kalorien?', '100 g gekochte Nudeln', '100 g Banane', '100 g Putenbrust', '100 g eingelegte schwarze Oliven', 4, '100 Gramm eingelegte, schwarze Oliven bringen es auf 294 kcal. Damit sind sie deutlich kalorienreicher als Banane (95 kcal), Putenbrust (107 kcal) oder gekochte Nudeln (158 kcal).',
        'Welches der folgenden Lebensmittel hat die meisten Kalorien?', '500 g Apfel', '100 g Fruchtgummi', '100 g Schokolade', '100 g Erdnüsse', 4, '100 g Erdnüsse haben 620 kcal, Schokolade etwa 570 kcal, Fruchtgummi etwa 330 kcal und die fünffache Menge Äpfel bringt es gerade einmal auf etwa 275 kcal.',
        'Welches der folgenden Backwaren hat die meisten Kalorien?', '100 g Mehrkornbrötchen', '100 g Laugenstange', '100 g Schwarzbrot', '100 g Fladenbrot', 2, '100 g Laugenstange haben 320 kcal, Fladenbrot etwa 290 kcal, Mehrkornbrötchen etwa 260 kcal und Schwarzbrot bringt es auf etwa 200 kcal.'
  ),
  (
    'Gesund in Vilnius', '2015-07-02',
        'Welche Sportart gilt in Litauen als Nationalsport?', 'Basketball', 'Eishockey', 'Gewichtheben', 'Boxen', 1, 'Ein Basketballspiel versäumt man in Litauen nur selten. Kein anderer Sport berührt die Litauer mehr als das Basketball. Die Namen von Spielern wie Arvydas Sabonis, Šarūnas Jasikevičius, Arvydas Macijauskas, Žydrūnas Ilgauskas kennt in Litauen jeder. Dreimal holte sich die litauische Basketballmannschaft olympisches Bronze, dreimal konnte sie die Europa-Meisterschaft für sich entscheiden.',
        'Für die gesamte litauischen Küche gelten Kartoffeln als Grundlage. Wie viel Kalorien enthalten 100 Gramm Kartoffeln?', '35 kcal', '70 kcal', '140 kcal', '245 kcal', 2, 'Kartoffeln bestehen zu circa 78% aus Wasser und enthalten viele Mineralien sowie Vitamine. Ihr teilweise schlechter Ruf rührt von den sehr beliebten aber auch fettreichen Zubereitungsweisen, z. B. als Pommes Frites her.  Eine Portion der litauischen “Cepelinai” enthält 810 kcal.',
        'Alle fünf Jahre finden in Vilnius beispiellose nationale Gesangs- und Tanzfeste statt. Welches harmoniestiftende Hormon wird beim Singen freigesetzt?', 'Kortisol', 'Adrenalin', 'Östrogen', 'Oxytocin', 4, 'Bei Chorsängern konnte eine erhöhte Produktion des “Kuschelhormons” Oxytocin nachgewiesen werden. Zudem haben Studien gezeigt, dass die Konzentration des Stresshormons Kortisol beim bloßen Anhören von Musik noch stärker sinkt als beim Singen. Musik hören sowie Singen sind also durchaus empfehlenswerte Beschäftigungen.'
  ),
  (
    'Früher und heute', '2015-07-03',
        'Vor 20 Jahren hatte ein Cheeseburger im Durchschnitt 333 kcal. Wie viele sind es heute?', '700 kcal', '690 kcal', '590 kcal', '420 kcal', 3, 'Ein Cheeseburger hat heute im Durchschnitt 590 kcal. Um diese zusätzlichen 257 kcal zu verbrennen, kann man etwa 1,5 h Hanteltraining machen.',
        'Eine 225 ml Tasse Kaffee mit Milch und Zucker hatte vor 20 Jahren circa 45 kcal. Wie viele sind es heute für eine große Tasse (400 ml)?', '175 kcal', '90 kcal', '125 kcal', '150 kcal', 1, 'Heutige 400 ml Kaffeeportionen mit Milch und Zucker haben 175 Kalorien. Um die zusätzlichen 130 Kalorien kann man etwa 40 Minuten spazieren gehen.',
        'Zwei Stück Pepperoni-Pizza hatten vor 20 Jahren ungefähr 500 Kalorien. Wie viele Kalorien haben sie heute?', '750 kcal', '450 kcal', '850 kcal', '650 kcal', 3, 'Zwei große Stücke Pizza enthalten heute ungefähr 850 Kalorien. Spielt man eine Stunde Golf und trägt man dabei die Schläger und geht zu Fuß, kann man die 350 Extrakalorien verbrennen.'
  ),
  (
    'Fit in jedem Alter', '2015-07-04',
        'Was meint der Begriff "Lifetime-Sport"?', 'Sportarten, die nur von bestimmten Altersgruppen durchgeführt werden', 'Sportarten, die und bis ins hohe Alter ausgeübt werden können', 'Risikosportarten, die zur Lebenszeitverkürzung führen können', 'Sportarten, die im Durchschnitt jeder mindestens einmal im Leben ausübt', 2, 'Als Lifetime-Sport bezeichnete Sportarten können bis ins hohe Alter ausgeführt werden. Typische Beispiele sind Schwimmen oder Radfahren.',
        'Durch Bewegung oder Training kann die körperliche Leistungsfähigkeit verbessert werden. Bis zu welchem Alter ist das möglich?', 'bis 60 Jahre', 'bis ca. 55 Jahre', 'in jedem Alter', 'bis ca. 75 Jahre', 3, 'Es gibt keine Altersgrenze für körperliche Aktivität und gezieltes Training! Etwa ab dem 35. Lebensjahr beginnt die Leistungsfähigkeit des Körpers aufgrund natürlicher Alterungsprozesse abzunehmen. Körperliche Inaktivität fördert diese Abbauvorgänge, regelmäßige Übung verzögert sie!',
        'Ab welchem Alter wird ein Gesundheitsprüfung durch einen Arzt für Sportanfänger und Wiedereinsteiger empfohlen?', '35 Jahre', '45 Jahre', '55 Jahre', '65 Jahre', 1, 'Besonders für Anfänger und Wiedereinsteiger über 35 Jahre gilt: Erst zum Arzt und dann zum Sport! Eine Gesundheitsprüfung durch einen (Sport-)Arzt ist ebenso wichtig bei Vorerkrankungen oder Beschwerden sowie Risikofaktoren wie Rauchen oder Bluthochdruck.'
  ),
  (
    'Glück und Wohlbefinden', '2015-07-05',
        'Was steckt hinter der Abkürzung GNH?', 'Gesundheit nachhaltig halten', 'gesund nach Hause', 'General National Health', 'Gross National Happiness', 4, 'Hinter der Abkürzung steht die Bezeichnung Gross National Happiness, dem so genannten Bruttonationalglück. Die Idee geht auf den König von Bhutan zurück, der Glück bereits 1972 zum obersten Ziel der nationalen Politik ausgerufen hat.',
        'Welches ist das glücklichste Land?', 'Maritius', 'Schweiz', 'Singapur', 'Deutschland', 2, 'Laut World Happiness Report 2014 ist das Wohlbefinden in der Schweiz am höchsten. Neben dem Einkommen und der Lebenserwartung haben soziale Beziehungen und die Freiheit, eigene Entscheidungen zu treffen, Einfluss auf das persönliche Wohlbefinden.',
        'Welcher der folgenden Ansätze fördert das Wohlbefinden am besten?', 'Eis essen', 'Dankbar sein', 'Urlaub machen', 'nichts von allem', 2, 'Es gibt viele Wege, das eigene Wohlbefinden zu steigern. Studien zeigen, dass sich Menschen, die dankbar sind und sich der Dinge erfreuen, die sie haben, glücklich und wohler fühlen.'
  ),
  (
    'Gesunde Vorsätze', '2015-07-06',
        'Jeder kennt sie: die guten Vorsätze, mehr für die Gesundheit zu tun. Wie startet man am Besten?', 'einfach loslegen, statt lange nachzudenken', 'zunächst einen Plan machen', 'zunächst anderen zuschauen', 'nichts überhasten, morgen ist auch noch ein Tag', 2, 'Auch wenn Ambitionismus wichtig ist, sollte man einen kleinen Plan erarbeiten, wie man sein Vorhaben in die Tat umsetzen will. Hierzu gehört die Festlegung, was wann mit welchen Mitteln erreicht werden soll.',
        'Ziele für die eigene Gesundheit zu setzen ist wichtig. Welches der folgenden Kriterien sollte dabei beachtet werden?', 'möglichst langfristig planen', 'möglichst mit Freunden planen', 'möglichst kurz planen', 'möglichst spezifisch planen', 4, 'Als Faustregel dient die SMART-Formel. Ziele sollten möglichst spezifisch sein, aber auch machbar, attraktiv sowie realistisch und terminiert. Denke lieber in kleinen Schritten als in zu Großen.',
        'Falls die Umsetzung der Gesundheitsziele mal nicht klappt: wie sollte man mit Misserfolgen umgehen?', 'sich ärgern und ein Eis essen', 'alles hinschmeißen', 'kurz analysieren, woran es gelegen hat', 'gar nichts, beim nächsten Mal klappt es vielleicht', 3, 'Kleine Misserfolge und Rückschläge gehören genauso wie die Erfolge zum Alltag. Überlege kurz, warum es nicht geklappt hat und berücksichtige dies bei der Planung. So klappt es beim nächsten Mal bestimmt.'
  ),
  (
    'Vitamine', '2015-07-07',
        'Welches Lebensmittel enthält je 100g die größte Menge an Vitamin C?', 'gekochte Kartoffeln', 'Zitronensaft', 'gedünstete Paprika ', 'gekochter Grünkohl', 3, 'Der Tagesbedarf eines gesunden Erwachsenen an Vitamin C beträgt 100 mg. 100 g gedünstete Paprika enthalten circa 105 mg, während gekochte Kartoffeln lediglich 14 mg entahlten. Vitamin C erfüllt im Körper vielfältige Schutzfunktionen und ist u.a. wichtig für den Aufbau von Bindegewebe und Knochen.',
        'Welches Lebensmittel enthält besonders viel Vitamin A?', 'Karotten', 'Grünkohl', 'Honigmelone', 'alle drei', 4, 'Der Tagesbedarf eines Erwachsenen an Vitamin A liegt bei 1 mg. Möhren, Honigmelonen und Grünkohl enthalten circa 0,8 - 1 mg Vitamin A je 100 g. Vitamin A (Retinol) ist für eine Reihe wichtiger Abläufe und Funktionen im Körper unentbehrlich. Besonders bedeutend ist es für das Sehen und das Wachstum.',
        'Wodurch lässt sich der Vitamin D-Gehalt im Körper steigern?', 'Milch und Milchprodukte', 'regelmäßig Sonne tanken', 'Hering und Thunfisch', 'alle drei ', 4, 'Der Bedarf eines Menschen an Vitamin D sollte vorrangig durch Eigenproduktion des Körpers gedeckt werden. Dies geschieht, in dem UV-Strahlung auf die Haut trifft. Die angeführten Nahrungsmittel dienen als Ergänzung des Vitamin D-Haushaltes.'
  ),
  (
    'Rückenfit', '2015-07-08',
        'Mit welcher Maßnahme kann Rückenschmerzen aufgrund vielen Sitzens vorgebeugt werden?', 'nach Feierabend auf dem Sofa entspannen', 'jeden Tag einen Apfel essen', 'auf dem Weg zur Arbeit lieber stehen (z.B. in Bus oder Bahn)', 'regelmäßige Übungen in den Arbeitsalltag integrieren', 4, 'Regelmäßige Kräftigungsübungen der Rückenmuskulatur stabilisieren die Wirbelsäule.',
        'Welche Sportart ist nicht rückenschonend?', 'Pilates', 'Nordic Walking', 'Brustschwimmen', 'Radfahren', 3, 'Schwimmen ist grundsätzlich gut, jedoch führt Brustschwimmen eher zum Hohlkreuz oder zu einer Überstreckung des Nackens, da man den Kopf über Wasser hält. Rückenschonender sind daher Rückenschwimmen und Kraulen.',
        'Warum sollte man bei Rückenbeschwerden die Bauchmuskeln trainieren?', 'man soll generell alle Muskeln des Oberkörpers trainieren', 'weil der Bauch der Gegenspieler vom Rücken ist', 'weil der Körper mit zunehmendem Bauchfett nach vorne fällt', 'man sollte eher den Rücken und nicht den Bauch trainieren', 2, 'Die Bauchmuskulatur ist der Gegenspieler der Rückenmuskulatur und unterstützt diese bei der Bewegung und Haltung. Sie lässt sich außerdem gezielt trainieren und entlastet damit den Rücken.'
  ),
  (
    'Gesund in Oslo', '2015-07-09',
        'Welche Sportart hat ihren Ursprung in Norwegen?', 'Skifahren', 'Fußball', 'Darts', 'Paragliding', 1, 'Erfunden wurde das Skilaufen in Morgedal in der Region Telemark. Das fast jeder Norweger schon von Kindesbeinen an auf Skiern steht, zeigt sich auch alle vier Jahre bei den Olympischen Winterspielen. Aus Norwegen kommen einige der berühmtesten Wintersportler aller Zeiten.',
        'Das Saunieren gehört zur norwegischen Kultur. Welches ist keine positive Wirkung des Saunierens?', 'man nimmt ab', 'Atemwegserkrankungen werden gelindert', 'Durchblutung der Schleimhäute wird verbessert', 'Immunsystem wird gestärkt', 1, 'Zwar verliert verliert man nach etwa zwei Saunagängen etwa ein Kilo, jedoch geht dieser Gewichtsverlust ausschließlich auf das ausgeschwitzte Wasser zurück, welches am Ende eines Saunatages unbedingt wieder zugeführt werden sollte.',
        'Norwegischer Lachs steht sowohl in Norwegen als auch hierzulande gerne auf dem Speiseplan. Wie viel Kalorien haben 100 Gramm Lachs?', '100 kcal', '300 kcal', '200 kcal', '400 kcal', 3, '100 Gramm Lachs haben etwa 200 Kilokalorien. Zudem ist Lachs reich an Omega-3 Fettsäuren. 125 Gramm Norwegischer Lachs deckt den gesamten Wochenbedarf an Omega-6-Fettsäuren.'
  ),
  (
    'Blut und Blutdruck', '2015-07-10',
        'Wie viel Blut fließt durch den Körper eines erwachsenen Menschen?', '3 bis 4 l', '5 bis 6 l', '7 bis 8 l', '9 bis 10 l', 2, 'Durch den Körper eines erwachsenen Menschen fließen zwischen 5 l und 6 l Blut. Männer haben bedingt durch Größen- und Gewichtsunterschiede etwa 1 l Blut mehr als Frauen.',
        'Welche Blutdruckwerte gelten als optimal?', '160/100 mmHg', '140/120 mmHg', '90/60 mmHg', '120/80 mmHg', 4, 'Ein Blutdruck von 120/80 mmHg gilt als optimal. Dabei gibt die erste Zahl den systolischen Wert an, der gemessen wird, wenn sich der Herzmuskel zusammenzieht. Der diastolische Wert entsteht dagegen während der Entspannungsphase des Herzens.',
        'Welche der folgenden Maßnahmen trägt nicht zur Senkung des Blutdrucks bei?', 'Gemüse statt Obst essen', 'den Salzkonsum einschränken', 'den eigenen Umgang mit Stress verbessern', 'mehr Bewegung im Alltag einbauen ', 1, 'Zwar enthält Gemüse deutlich weniger Fruchtzucker, hat jedoch keinen großen Einfluss auf die Blutdrucksenkung. Eine Kombination aus körperlicher Aktivität, gesunder Ernährung und der Vermeidung von Stress sind perfekte Zutaten für Deine Gesundheit.'
  ),
  (
    'Fette gleich Fette?', '2015-07-11',
        'Welches Lebensmittel hat den höchsten Fettanteil?', 'Fruchtgummi', 'weiße Schokolade', 'zuckerfreier Karamellbonbon', 'Frucht-Rahmeis', 3, 'Zuckerfreie Karamellbonbons enthalten zwar wenig Zucker aber ganze 41 % Fett. In weißer Schokolade stecken immerhin noch 30 % und in Frucht-Rahmeis dagegen nur 11,3 % Fett. Fruchtgummi enthalten in der Regel kein oder nur sehr wenig Fett.',
        'Welches der folgende Fette gehört nicht zu den gesunden Fetten?', 'Olivenöl', 'Tierische Fette', 'Fischölkonzentrat', 'Rapsöl', 2, 'Fette enthalten gesättigte und ungesättigte Fettsäuren. Pflanzliche Fette sind reich an ungesättigten Fettsäuren und daher gegenüber den tierischen Fetten zu bevorzugen. Tierische Fette erhöhen das Risikovon Herz-Kreislauf-Erkrankungen.',
        'Welcher Fisch liefert den höchsten Omega-3-Fettsäurenanteil?', 'Lachs', 'Thunfisch', 'Aal', 'Hering', 4, 'Im Hering ist mit etwa 2.000 mg pro 100 g die größte Menge an Omega-3-Fettsäuren enthalten, während Aal gerade einmal 250 mg enthält. Omega-3-Fettsäuren haben viele positive Effekte auf unseren Körper und sollten daher 1-2 Mal in der Woche über Fischmahlzeiten abgedeckt werden.'
  ),
  (
    'Populäre Irrtümer', '2015-07-12',
        'Welcher ist ein Ernährungsirrtum?', 'Karotten sind gut für die Haut', 'zu viel Salz ist ungesund', 'Melissentee wirkt beruhigend', 'Spinat enthält besonders viel Eisen', 4, 'Spinat regt das Muskelwachstum und stärkt die Sehkraft und die Atemwege. Aber es enthält nur geringfügig mehr Eisen als Schokolade.',
        'Welcher ist ein Bewegungsirrtum?', 'durch Bewegung kann man Stress abbauen', 'wer viel schwitzt, muss sehr viel trinken', 'regelmäßige Bewegung fördert die Konzentrationsfähigkeit', 'bei Rückenschmerzen sollte man den Bauch trainieren', 2, 'Zwar sollte man bei körperlicher Betätigung ausreichend trinken, jedoch kann der Körper nur etwa 0,8 l pro Stunde verarbeiten. Bei zu hoher Flüssigkeitszufuhr werden Mineralien sogar ausgeschwemmt.',
        'Welches ist ein weiterer Irrtum?', 'nicht jedes Fett macht fett', 'viel Sport hilft viel', 'wer viel isst, wiegt nicht gleich viel', 'Wenigschläfer sind nicht weniger gesund', 2, 'Natürlich stärkt regelmäßige Bewegung Muskeln, Immunsystem und hält Herz und Kreislauf fit. Exzessiver Freizeitsport ohne ausreichend Pausen bewirkt jedoch das Gegenteil. Der Bewegungsapparat wird leichter und häufiger verletzt, das Immunsystem wird anfälliger. Man wird anfälliger für Infekte.'
  ),
  (
    'Entspannung', '2015-07-13',
        'Welches ist keine positive körperliche Auswirkung von Entspannungsverfahren?', 'Verbesserung des Sehvermögens', 'Entspannung der Muskeln', 'Rückgang der Atemfrequenz', 'Regeneration des Immunsystems ', 1, 'Das Sehvermögen verbessert sich eher nicht, nachgewiesen sind jedoch positive Wirkungen auf Muskeln, Immunsystem und Atemfrequenz.',
        'Welches ist kein Entspannungsverfahren?', 'Schokolade essen', 'autogenes Training', 'Yoga', 'tief durchatmen', 1, 'Zwar werden durch den Verzehr von Schokolade Stresshormone gesenkt, jedoch kann hierbei noch nicht von einem Entspannungsverfahren gesprochen werden. Hingegen sind Atemübungen, autogenes Training oder auch Verfahren zur Muskelentspannung sehr geeignet.',
        'Welches ist keine positive psychische Auswirkung von Entspannungsverfahren?', 'Rückgang starker Gefühlsausbrüche', 'Steigerung der Konzentrationsfähigkeit', 'Verbesserung der Merkfähigkeit', 'Reduktion von Zappeligkeit', 3, 'Zwar haben Entspannungsverfahren auf alle der genannten Faktoren eine positive Wirkung, jedoch ist die Verbesserung der Merkfähigkeit auf neurobiologische Veränderungen zurückzuführen.'
  ),
  (
    'Wanderlust', '2015-07-14',
        'Welche Dauer hat eine Wanderung nach dem deutschen Wanderverband mindestens?', 'mind. 3 Stunden', 'mind. 1 Stunde', 'mind. 20 Minuten', 'keine Mindestedauer', 2, 'Merkmale einer Wanderung sind nach dem Deutschen Wanderverband eine Dauer von mehr als einer Stunde, eine vorhergehende Planung und eine angepasste Ausrüstung.',
        'Ab wann erhalten Erwachsene in Deutschland das Wanderabzeichen?', 'Mind. 20 Wanderungen ', 'Mind. 100 Kilometer', 'Mind. 75 Kilometer in 5 Wanderungen', 'Mind. 200 km in 10 Wanderungen', 4, 'Erwachsene ab 18 Jahren erhalten das Wanderabzeichen, wenn sie im Jahr 200 Kilometer über 10 Wanderungen absolviert haben. Wer dies 3 Jahre in Folge schafft, erhält das Wanderabzeichen in Gold',
        'Welche der folgenden Aussagen stimmt nicht?', 'Wandern führt nur zu geringem Kalorienverbrauch', 'regelmäßiges Wandern wirkt als Stimmungsaufheller', 'regelmäßiges Wandern reduziert das Herzinfarktrisiko', 'regelmäßiges Wandern fördert die geistige Leistungsfähigkeit', 1, 'Wie bei jeder anderen sportlichen Aktivität wird auch beim Wandern Energie verbraucht. Bei einer 65 bis 70 Kilo schweren Person sind dies 300 kcal pro Stunde. Das ist vergleichbar mit Radfahren bei einer Geschwindigkeit von 12 bis 15 km/h.'
  ),
  (
    'Ausgewogene Ernährung', '2015-07-15',
        'Was bedeutet eigentlich "ausgewogene Ernährung"?', 'Alles, was gegessen wird, vorher abzuwiegen', 'Immer das zu essen, worauf man gerade Lust hat', 'Die Lebensmittelgruppen aus der Ernährungspyramide im richtigen Mischverhältnis zu essen', 'Die richtige Mischung aus frischen und fertigen Produkten zu essen', 3, 'Hinter dem abstrakten Begriff der “ausgewogenen Ernährung” verstecken sich verschiedene Empfehlungen der Deutschen Gesellschaft für Ernährung (DGE). Im Mittelpunkt steht, dass wir so vielseitig wie möglich essen und uns nicht auf einzelne Lebensmittelgruppen beschränken sollen.',
        'Wie viele Eier pro Woche werden für eine ausgewogene Ernährung empfohlen?', '4-6 Eier', '3-4 Eier', '1-3 Eier ', '6-8 Eier', 3, 'Mehr als ein bis drei Eier pro Woche solltest Du nicht zu Dir nehmen, denn diese enthalten viel Cholesterin. Wenn Du Eier mit Mayonnaise oder anderen Fetten/Ölen isst, nimmt Dein Körper wesentlich mehr unerwünschtes Cholesterin auf!',
        'Was versteckt sich hinter der Ernährungspyramide?', 'Lieblingsspeisen in verschiedenen Kulturkreisen', 'Kalorienangaben einzelner Lebensmittel', 'Fettgehalt einzelner Lebensmittel', 'Verschiedene Lebensmittelgruppen und ihr Verhältnis zueinander', 4, 'Die Ernährungspyramide stellt auf einfache Art und Weise die unterschiedlichen Lebensmittelgruppen dar (z.B. Obst und Gemüse, Getreideprodukte) und gibt an, wie hoch der Anteil dieser Lebensmittel im täglichen Speiseplan sein sollte.'
  ),
  (
    'Doping fürs Gehirn', '2015-07-16',
        'Was versteckt sich hinter dem Begriff Neuro-Enhancement', 'Verbesserung der Merkfähigkeit durch Übungen', 'Anschwillen des Gehirns', 'neurologische Erkrankung', 'geistige Leistungssteigerung durch psychoaktive Substanzen', 4, 'Neuro-Enhancement steht für Aktivitäten, bewusst in den chemischen Haushalt des eigenen Gehirns einzugreifen mit dem Ziel, konkrete erwünschte Leistungssteigerungen zu verursachen.',
        'Wieviel Beschäftigte nehmen in Deutschland leistungssteigernde Mittel?', 'unter 2 %', 'etwa 7 %', 'etwa 10 %', 'etwa 15 %', 2, 'Laut einer Studie der DAK nehmen etwa 3 Millionen Beschäftigte (7%) verschreibungspflichtige Medikamente, um am Arbeitsplatz leistungsfähiger zu sein oder um Stress abzubauen. Im Vergleich zu 2008 waren dies noch etwa 5%.',
        'Hat Neuro-Enhancement unerwünsche Nebenwirkungen?', 'Nein, sonst würde es nicht verkauft werden', 'Missbrauch und Abhängigkeit drohen', 'Körperliche Zerfallserscheinung', 'Vergesslichkeit', 2, 'In der Tag liegen erste Studien vor, die nahe legen, dass von einigen Mitteln zur Steigerung der Leistungsfähigkeit ein Abhängigkeitspotential ausgeht. Experten raten daher andere Methoden zur Verbesserung der Leistungsfähigkeit (z.B. ausreichend Schlaf).'
  ),
  (
    'Fit und aktiv', '2015-07-17',
        'Welche Dauer sollte die Aufwärmphase vor dem Sport haben?', 'bis zu 5 Minuten', '5-10 Minuten', '10-20 Minuten', '20-30 Minuten', 3, 'Ist die Aufwärmphase kürzer als 10 Minuten, werden Herz und Kreislauf nicht ausreichend auf die Belastung vorbereitet. Ein gutes Warm up senkt das Verletzungsrisiko erheblich.',
        'Was ist für das Eintreten sportlicher und gesundheitlicher Trainingseffekte nach körperlicher Belastung wichtig?', 'sich ausreichend zu erholen', 'viel zu essen', 'viel zu trinken', 'sich zu dehnen', 1, 'Alle Trainingseffekte – seien sie gesundheitlicher oder sportlicher Art – stellen sich erst in der darauffolgenden Erholung ein. In der Erholung werden die Energiespeicher wieder gefüllt und die Anpassungsvorgänge können stattfinden.',
        'Wie sollten persönliche Erholungsphasen gestaltet sein?', 'einmal im Jahr Urlaub zu machen genügt', 'einmal in der Woche zu entspannen genügt', 'regelmäßige Erholung - am besten täglich', 'je mehr Erholung, desto besser', 3, 'Sich regelmäßig zu erholen hilft, die Energiespeicher von Körper und Seele erst gar nicht komplett zu leeren. Einmal im Jahr auf Entspannung und Erholung zu achten ist zu wenig. Gibt man sich nur noch dem „süßen Nichtstun“ hin, fehlt der Ausgleich über die Aktivität.'
  ),
  (
    'Erschöpft und ausgebrannt', '2015-07-18',
        'Wie hoch ist die Anzahl an Arbeitsunfähigkeitstagen aufgrund von Burnout je 100 Versicherter?', '10', '15', '3', '5', 1, 'Laut DAK lag die Anzahl an AU-Tagen aufgrund vorn Burnout im Jahr 2012 je 100 Versicherter bei 10. Im Vergleich zu 2009 entspricht dies annähernd einer Verdopplung.',
        'Was ist keine Ursache von Burnout?', 'Stress bei der Arbeit', 'hohe Anforderungen an sich selbst', 'hoher Zeitdruck', 'Position als Manager', 4, 'Zwar haben Manager viele Aufgaben zu bewältigen, jedoch verfügen sie auch über mehr Ressourcen, die ihnen bei der Bewältigung helfen.',
        'Was ist kein Symptom von Burnout?', 'Hyperaktivität', 'Zustand der totalen Erschöpfung', 'Ausgebranntsein', 'nachlassende Leistungsfähigkeit', 1, 'Burnout zeichnet sich vor allem durch Erschöpfung, nachlassende Leistungsfähigkeit und zunehmende Isolation aus. Hyperaktivität ist demgegenüber kein typisches Symptom.'
  ),
  (
    'Mineralstoffe', '2015-07-19',
        'In welchem Produkt sind die meisten Ballaststoffe enthalten?', 'Sonnenblumenbrot', 'Roggenknäckebrot', 'Weizenvollkornbrot', 'Zwieback', 2, 'In 100 g Roggenknäckebrot sind stolze 14 g Ballaststoffe enthalten, danach kommen Weizenvollkorn- und Sonnenblumenbrot mit etwa 7 g und Zwieback mit rund 5 g. Für eine ausgewogene Ernährung und zur Erhaltung der Gesundheit sind Ballaststoffe notwendig.',
        'Welches Lebensmittel enthält je 100 g die meiste Menge Eisen?', 'Spinat', 'Linsen', 'Weizenkleie', 'Haferflocken', 3, 'Alle diese Lebensmittel enthalten viel Eisen. Am höchsten ist die Menge bei der Weizenkleie mit circa 16 mg je 100g , gefolgt von Linsen (8,0 mg), Haferflocken (5,6 mg) und Spinat (3,7 mg). Das Spurenelement Eisen spielt für den Körper eine wichtige Rolle bei der Sauerstoffversorgung.',
        'Welches Lebensmittel enthält je 100 g die meiste Menge Calcium?', 'Milch', 'Bohnen', 'Kohlrabi, roh', 'Grünkohl, gekocht', 4, 'Der Tagesbedarf eines erwachsenen Mannes beträgt 10 mg, bei einer erwachsenen Frau sind es 15 mg. Mit 160 mg je 100 g enthält gekochter Grünkohl den höchsten Anteil an Calcium. Die wichtigste Funktion von Calcium im menschlichen Körper ist der Aufbau und Erhalt von Knochen und Zähnen.'
  ),
  (
    'Der Ausdauer zuliebe', '2015-07-20',
        'Mit welcher Intensität sollte ein gesundes Ausdauertraining durchgeführt werden?', 'so schnell wie möglich', 'sodass man innerhalb von 5 Minuten schwitzt', 'sodass eine Unterhaltung nebenbei möglich ist', 'sodass man nicht dabei schwitzt', 3, 'Das Ausdauertraining sollte nicht zu intensiv sein, da andernfalls Milchsäure entsteht, die die Muskulatur ermüden lässt.',
        'Wie regelmäßig sollten man sich körperlich betätigen, um das Herz-Kreislauf-System positiv zu beeinflussen?', 'mind. 5 mal pro Woche für 30 Minuten', 'mind. 2 mal pro Woche für 1 Stunde', 'mind. einmal pro Woche für 2 Stunden', 'mind. einmal pro Woche für 3 Stunden', 1, 'Fünfmal pro Woche für eine halbe Stunde solltest Du laut Empfehlung der Weltgesundheitsorganisation mindestens körperlich aktiv sein. Denn nur regelmäßige sportliche Betätigung wirkt sich positiv auf das Herz-Kreislauf-System aus.',
        'Was bedeutet der Begriff Reizschwelle in Bezug auf körperliches Training?', 'Motivation, das Training zu beginnen', 'Dauer und Intensität einer Bewegung, die eine Leistungssteigerung auslöst', 'Anstrengungsgrad, bei dem das Training abgebrochen wird', 'Anstrengungsgrad, der zu muskulären Verletzungen führen kann', 2, 'Entscheidend für eine Verbesserung der Leistungsfähigkeit ist, ob der Körper durch die Bewegung ausreichend belastet wird. Nur wenn der Bewegungsreiz – die Trainingsdauer und die Intensität – hoch genug ist, wird eine Leistungssteigerung bewirkt.'
  ),
  (
    'Gesund in Paris', '2015-07-21',
        'Obgleich die Franzosen für ihre Liebe zum guten Essen bekannt sind, sind sie im Vergleich zu anderen Ländern seltener übergewichtig. Warum?', 'Franzosen essen mehr Obst und Gemüse', 'Franzosen essen kaum Süßigkeiten', 'Franzosen essen selten nach 20 Uhr', 'Franzosen essen weniger Zwischenmahlzeiten', 4, 'In der Tat nehmen die Franzosen etwa 90% ihrer täglichen Kalorien in den Hauptmahlzeiten ein, die sie gerne im festlichen oder familiären Rahmen mit anderen einnehmen. Wer nicht nebenbei, sondern bewusst und in Gesellschaft isst, greift weniger oft zu Naschereien.',
        'Wieviel Kalorien hat eine Portion (120g) der klassischen französischen Nachspeise "Mousse au Chocolat"?', '600 kcal', '258 kcal', '375 kcal', '415 kcal', 4, 'Eine Portion Mouse au Chocolat kommt auf etwa 415 kcal, immerhin weniger als eine 100h Tafel Schokolade, die es auf etwa 550 kcal bringt.',
        'Wie lang war die Strecke der ersten Tour de France im Jahr 1903?', '1.678 km', '2.428 km', '3.216 km', '2.933 km', 2, 'Die erste Ausgabe der Tour de France hatte sieben Etappen mit insgesamt 2.428 Kilometer. Der Sieger Marice Garin bewältigte diese Strecke in etwa 80 Stunden.  '
  ),
  (
    'Hunger und Sättigung', '2015-07-22',
        'Was ist wichtig, um richtig satt zu werden?', 'sich beim Essen Zeit zu nehmen und gut zu kauen', 'schnell zu essen, nur so bemerkt man, dass sich der Magen dehnt', 'einmal am Tag etwas warmes zu essen', 'bei jeder Mahlzeit etwas Fleisch zu essen', 1, 'Wer sich Zeit zum Essen nimmt, bemerkt, wann er satt wird und hat auch das Gefühl, etwas gegessen zu haben. Kleine Portionen, schön angerichtet und langsam gegessen, helfen dabei. Denn das Sättigungsgefühl setzt erst nach ca. 20 Minuten ein.',
        'Wieviele Mahlzeiten sollte man am Tag einnehmen?', '3', 'es gibt hierfür keine Vorgaben ', '7', '5', 2, 'Tatsächlich tun sich auch Ernährungsexperten schwer in der Beantwortung dieser Frage. Egal ob mehrere kleine oder wenige große Portionen: Wichtig ist, sich auf das Essen zu konzentrieren, sich dafür Zeit zu nehmen.',
        'Warum verspüren wir nach einem üppigen Abendmahl oftmals ein Völlegefühl?', 'weil man nach dem Essen nur wenig aktiv ist', 'weil die anderen Mahlzeiten noch nicht verdaut sind', 'weil die Verdauung am Abend langsamer arbeitet', 'ein Völlegefühl entsteht unabhängig von der Tageszeit', 3, 'Auch wenn Völlegefühl natürlich auch am Tag auftreten kann, arbeitet die Verdauung am Abend langsamer, wodurch größere Mahlzeiten langsamer verarbeitet werden. Dies fördert das Völlegefühl und stört den Schlaf.'
  ),
  (
    'Energieverbrauch', '2015-07-23',
        'Welche der folgenden Aktivitäten sorgt für den höchsten Kalorienverbrauch?', 'Tanzen', 'Laufen', 'Schwimmen', 'Radfahren', 2, 'Bei einem Körpergewicht von 75 kg werden in einem Zeitraum von 15 Minuten beim Laufen circa 240 kcal, beim Radfahren 110 kcal, beim Schwimmen 113 kcal und beim Tanzen etwa 77 kcal verbraucht.',
        'Wie viele Kalorien verbraucht ein erwachsener Mann mit einem Gewicht von 75kg in der Stunde während er schläft oder sitzt?', '150 kcal', '30 kcal', '75 kcal', '15 kcal', 3, 'Der Grundumsatz kann mit einer einfachen Formel geschätzt werden. Für normalgewichtige Männer gilt: 1 kcal/kg Körpergewicht/Stunde (zum Beispiel bei 75 kg = 75 kcal/Stunde). Die Formel für Frauen lautet: 0,9 kcal/kg Körpergewicht/Stunde.',
        'Welches Organ verbraucht am meisten Energie, wenn der menschliche Körper aktiv ist?', 'Muskulatur', 'Herz', 'Lunge', 'Leber', 1, 'Wenn wir aktiv werden, verbrauchen die Muskeln deutlich mehr Energie als andere Organe. Darüber hinaus wirkt Bewegung auch auf Organe, die nicht unmittelbar am Energiestoffwechsel beteiligt sind (z.B. Gehirn). Deshalb wirkt regelmäßige Bewegung positiv auf den gesamten Organismus.'
  ),
  (
    'Regeln der Ernährung', '2015-07-24',
        'Welche ist keine der "10 Regeln der Deutschen Gesellschaft für Ernährung"?', 'Gemüse und Obst - Nimm "5 am Tag', 'Die Lebensmittelvielfalt genießen', 'Gurken sind besser als Äpfel', 'Zucker und Salz in Maßen', 3, 'Es gibt natürlich keine Ernährungsempfehlung die besagt, dass Gurken besser als Äpfel sind. Nach der „5-am-Tag“ Regel soll man täglich 5 Portionen Obst und Gemüse zu sich nehmen.',
        'Welche ist keine der "10 Regeln der Deutschen Gesellschaft für Ernährung"?', 'Auf Kaffee verzichten', 'Schonend zubereiten', 'Wenig Fett und fettreiche Lebensmittel', 'Reichlich Getreideprodukte sowie Kartoffeln', 1, 'Die 10 Regeln der Deutschen Gesellschaft für Ernährung machen keine Aussagen zum Kaffeekonsum. Laut der Deutschen Herzstiftung können jedoch 4-5 Tassen auf 2-3 Mal am Tag verteilt problemlos getrunken werden. Personen mit Herzrhythmusstörungen sollten jedoch weniger Kaffee trinken.',
        'Welche ist keine der "10 Regeln der Deutschen Gesellschaft für Ernährung"?', 'Auf das Gewicht achten und in Bewegung bleiben', 'Reichlich Flüssigkeit', 'Sich Zeit nehmen und genießen', 'Nach 18 Uhr nichts mehr essen', 4, 'Abends nichts mehr zu essen gehört nicht zu den Regeln der Deutschen Gesellschaft für Ernährung. Streng genommen ist es völlig egal, wann man isst, so lange die maximale Kalorienmenge nicht überschritten wird.'
  ),
  (
    'Welcher Name passt?', '2015-07-25',
        'Welcher Name ist keine Kartoffelsorte?', 'Heidemarie', 'Adretta', 'Siglinde', 'Violetta', 1, 'Heidemarie ist keine Kartoffelsorte. Während die gelbe Siglinde und die rote Violette festkochende Kartoffeln sind, gehört Adretta zu den mehligkochenden Vertretern.',
        'Welcher Name ist keine Apfelsorte?', 'Rubinette', 'Roter Boskoop', 'Braeburn', 'Goldener Bursche', 4, 'Auch wenn Äpfel oftmal goldgelb scheinen, ist der goldene Bursche keine Apfelsorte. Äpfel unterscheiden sich in ihrem Vitamin-C-Gehalt, wobei der Braeburn zu den Vitamin-C-reichen Sorten gehört.',
        'Welcher Name steht nicht für einen grünen Tee?', 'Sencha', 'Keemun', 'Bancha', 'Matcha', 2, 'Keemun ist ein schwarzer Tee. Grünem Tee wird eine gesundheitsförderliche Wirkung nachgesagt. So wirkt er antioxidativ, entgiftend und beugt Krebs- und Herz-Kreislauferkranungen vor.'
  ),
  (
    'Schlafen und entspannen', '2015-07-26',
        'Wie viele Stunden Schlaf braucht ein erwachsener Mensch pro Tag?', 'egal, Hauptsache vor Mitternacht', '6 bis 7 Stunden', 'mehr als 8 Stunden', '7 bis 8 Stunden', 4, 'Es gibt keine einheitliche Empfehlung zur täglichen Schlafdauer, da das Schlafbedürfnis subjektiv ist. So schlief Albert Einstein bis zu 14 Stunden, Napoleon oft nicht mehr als 4 Stunden. Einige Forscher empfehlen eine Schlafdauer zwischen 7 und 8 Stunden.',
        'Welches Kraut ist förderlich bei Einschlafproblemen?', 'Pfefferminze', 'Melisse', 'Rosmarin', 'Thymian', 2, 'Bei Einschlafproblemen hilft oft ein heißer Melissentee. Pfefferminze beruhigt dagegen den Magen, während Rosmarin anregend auf das Zentrale Nervensystem wirkt und Thymian Krämpfe der Atemwege lösen kann.',
        'Welches Kraut hat eine positiven Einfluss auf das Gemüt?', 'Johanniskraut', 'Baldrian', 'Melisse', 'Rosmarin', 1, 'Als Psychotherapeutikum mit positivem Einfluss ist Johanniskraut bereits seit Jahrhunderten bekannt. Es fördert die Anreicherung von Botenstoffen für positives Denken und einen stärkeren Antrieb.'
  ),
  (
    'Wieviel ist gut?', '2015-07-27',
        'Wieviel Portionen Brot, Getreide und Beilagen soll eine erwachsene Person pro Tag zu sich nehmen?', '1', '2', '4', '3', 3, 'Laut infodienst Ernährung, Landwirtschaft, Verbraucherschutz sollen pro Tag 4 Portionen Brot, Getreide und Beilagen (z. B. Kartoffeln) gegessen werden. Eine Portion entspricht einer Hand voll.',
        'Wieviel Portionen Milch und Milchprodukte soll eine erwachsene Person pro Tag zu sich nehmen?', '1', '2', '3', '4', 3, 'Laut infodienst Ernährung, Landwirtschaft, Verbraucherschutz sollen pro Tag 3 Portionen Milch- und Milchprodukte. Eine Portion entspricht einem Glas oder einem Jogurtbecher.',
        'Wieviel Zucker am Tag ist in Ordnung?', '2 % des durchschnittlichen Kalorienbedarfs', '10 % des durchschnittlichen Kalorienbedarfs', '18 % des durchschnittlichen Kalorienbedarfs', '15 % des durchschnittlichen Kalorienbedarfs', 2, 'Der durchschnittliche Kalorienbedarf bei Frauen liegt bei circa 2000 kcal am Tag, bei Männern etwas höher. Maximal 10 % (idealerweise sogar 5%) hiervon soll aus Zucker stammen. Das entspricht ca. 50 g Zucker für Frauen/Tag und 65 g Zucker für Männer/Tag.'
  ),
  (
    'Früher und heute 2', '2015-07-28',
        'Eine Tüte Popcorn hatte vor 20 Jahren 270 kcal. Wie viele sind es heute?', '820 kcal', '630 kcal', '450 kcal', '530 kcal', 2, 'Eine Tüte Popcorn hat heute ungefähr 630 kcal. Um die zusätzlichen 360 kcal zu verbrennen, kann man 1 h 15 min Aqua-Aerobic machen.',
        'Vor 20 Jahren hatte ein Bagel einen Durchmesser von circa 7,5 cm und enthielt ungefähr 140 kcal. Wie viele sind es heute?', '350 kcal', '150 kcal', '450 kcal', '250 kcal', 1, 'Ein Bagel hat heute einen Durchmesser von circa 15 cm und enthält ungefähr 350 kcal. Um diese zusätzlichen 210 kcal zu verbrennen, kann man etwa 50 min im Garten Laub harken.',
        'Vor 20 Jahren wog ein Muffin etwa 43 g und enthielt etwa 210 kcal. Wie viele sind es heute?', '300 kcal', '650 kcal', '500 kcal', '420 kcal', 3, 'Ein Muffin wiegt heute etwa 140 g und enthält etwa 500 kcal. Um diese zusätzlichen 290 kcal zu verbrennen, kann man etwa 90 min Staubsaugen.'
  ),
  (
    'Gesund altern', '2015-07-29',
        'Warum werden die Menschen auf der japanische Insel Okinawa besonders alt?', 'weil die Ernährung gesund ist', 'weil das Gesundheitswesen sehr gut ist', 'weil das Klima besonders mild ist', 'weil man alle Wege zu Fuß zurücklegen muss', 1, 'Es werden eine Reihe von Gründen diskutiert, u.a. das Klima, der Lebensstil sowie Schlafgewohnheiten. Fest steht jedoch, dass die fettarme und ausgewogene Ernährung eine große Rolle spielt.',
        'Sport ist gesund, so viel ist sicher. Was aber bringt es einem Menschen im Durchschnitt, wenn er sich 15 Minuten täglich sportlich betätigt?', 'es beruhigt sein Gewissen', 'es stärkt die Muskeln ein wenig', 'es bringt gar nichts', 'er lebt etwa 3 Jahre länger', 4, 'Nur 15 Minuten Sport pro Tag können das Leben um ganze drei Jahre verlängern. Einer Studie mit mehr als 400.000 Personen zufolge ergab sich durch das Viertelstündchen tägliche Bewegung auch ein weiterer Vorteil: das Krebstodesrisiko sank um zehn Prozent.',
        'Leben Nichtraucher im Vergleich zu Raucher länger?', 'Im Durchschnitt etwa 10 Jahre', 'Im Durchschnitt etwa 5 Jahre', 'Im Durchschnitt leben Raucher länger', 'Es gibt keinen Unterschied ', 1, 'Verschiedene Studien weisen darauf hin, dass Raucher im Vergleich zu Nichtrauchern eine deutlich geringere Lebenserwartung haben. Selbst wer erst im mittleren Alter mit dem Rauchen aufhört, kann seine Lebenserwartung deutlich erhöhen.   '
  ),
  (
    'Zeichen des Körpers', '2015-07-30',
        'Was ist die Ursache für Muskelkater?', 'fehlgeleitete Muskelkontraktionen', 'Risse in den Muskelfasern', 'Erhöhter Milchsäureanteil im Muskel', 'Wachstum der Muskeln', 2, 'Sportmediziner gehen heute von kleinen Rissen der Muskelfasern aus, die über Flüssigkeitseinlagerungen den unangenehmen Schmerz auslösen.',
        'Welche Tätigkeiten helfen nicht gegen Seitenstechen?', 'Trainieren der Bauchmuskulatur', '2 Stunden vor dem Sport nichts essen', 'viel Trinken', 'Gehpausen und reduziertes Tempo', 3, 'Über das Auftreten von Seitenstechen gibt es verschiedene Theorien. Die häufigsten Ursachen sind eine schwache Zwerchfelldurchblutung, untrainierte Bauchmuskulatur, unregelmäßiges Atmen, falsche Körperhaltung oder zu enge Kleidung.',
        'Sollte man Sportpausen bei Erkrankungen einlegen?', 'Was sind Sportpausen?', 'bei jeglichen Erkrankungen', 'Sport bei "Husten, Schnupfen Heiserkeit" ist in Ordnung', 'nur bei akuten Erkrankungen ', 2, 'Bei "Husten, Schnupfen, Heiserkeit", Fieber oder Gliederschmerzen, Grippe oder sonstigen akuten Erkrankungen ist unbedingt eine Sportpause notwendig! Beginne erst dann allmählich wieder mit dem Sport, wenn Du dich vollständig gesund fühlst.'
  ),
  (
    'Gesund in Kapstadt', '2015-07-31',
        'Welche Sportart ist  in Südafrika sehr beliebt?', 'Fußball', 'Cricket', 'Rugby', 'alle drei Sportarten', 4, 'Auch heute noch ist in Südafrika in vielen gesellschaftlichen Bereichen und so auch im Sport eine Trennung in ethnische Gruppen zu beobachten. Bei der schwarzen Bevölkerung ist Fußball mit Abstand der beliebteste Sport. Bei den Weißen sind es neben Fußball vor allem Rugby und Cricket beliebt.',
        'Eines der beliebtesten Gemüse der Südafrikaner ist der “Gem Squash”, eine dort beheimatete Kürbissorte. Wie viel Kalorien haben 100 Gramm des “Edelsteinkürbises”?', '20 kcal', '40 kcal', '80 kcal', '160 kcal', 2, 'Der “Gem Squash” ist mit 40 kcal eher kalorienarm. Nachdem man ihn halbiert und gekocht hat,  kann man ihn je nach Geschmack würzen, mit Butter abschmecken und  genießen. In Deutschland nimmt man meist Speise- oder Hokkaido-Kürbis.',
        'Die Menschen Südafrikas gelten als besonders herzlich und gastfreundlich. Welche Wirkung hat ein ehrliches Lächeln auf den Gegenüber?', 'ruft ein Lächeln hervor', 'löst positive Gefühle aus', 'wird als Kommunikationsbereitschaft verstanden', 'alle drei Wirkungen', 4, 'Lächeln steckt an. Wer jemanden lächeln sieht, lächelt fast automatisch mit. Ein ehrliches Lächeln ist meist an den Augen erkennbar. Es signalisiert Kommunikationsbereitschaft und Aufmerksamkeit. Zudem stärkt Lächeln und Lachen den Blutfluss und das Immunsystem.'
  ),
  (
    'Psychische Gesundheit', '2015-08-01',
        'Wodurch kann dem "Burnout" vorgebeugt werden?', 'durch eine Balance aus Arbeit und Erholung, Entspannung sowie Bewegung', 'durch Abhärtung - Ununterbrochen Arbeiten', 'durch Nichtstun - wer nichts tut, kann nicht ausbrennen', 'zwei Nachmittage in der Freimachen genügt', 1, 'Burnout ist äußerst ernst zu nehmen und kann jeden treffen. Mittels Ausgleich zwischen aktiver Tätigkeit und nachhaltiger Erholung kann man dem seelischen „Ausbrennen“ entgehen.',
        'Kann die psychische Gesundheit auch von einem selbst beeinflusst werden?', 'nur die physische Gesundheit', 'nein', 'nur mit professioneller Hilfe', 'ja', 4, 'Es ist durchaus möglich, selbst etwas für das seelische Wohlbefinden und die psychische Gesundheit zu tun. Vor allem in Krisen oder bei seelischen Leiden empfiehlt es sich allerdings, professionelle Hilfe in Anspruch zu nehmen.',
        'Welcher der folgenden Aspekte ist kein Risikofaktor für die psychische Gesundheit?', 'Arbeitslosigkeit', 'negative Erfahrungen in der Kindheit', 'Humor', 'Einsamkeit', 3, 'Negative Einflussfaktoren in der (frühen) Kindheit, Einsamkeit sowie Arbeitslosigkeit zählen zu den Risikofaktoren für die seelische Gesundheit. Es gibt jedoch auch Schutzfaktoren – so genannte Ressourcen, z. B. Humor.'
  ),
  (
    'Vitamine', '2015-08-02',
        'Welche Paprika hat den höchsten Vitamin-C-Gehalt?', 'grün', 'rot', 'gelb', 'alle gleich viel', 2, 'Die Paprika ist die Königin des Vitamin-C. Die unterschiedlichen Farben bilden den Reifegrad der Paprika ab (von grün zu rot). Je reifer die Paprika ist, umso größer ist ihr Vitamin-C Gehalt.',
        'Welche Melone enthält die meisten Vitamine?', 'Wassermelone', 'Galiamelone', 'Honigmelone', 'alle drei', 3, 'Generell unterscheidet man zwischen Zucker- und Wassermelonen. Wassermelonen bestehen zu über 90% aus Wasser. Die Honigmelone zählt zu den Zuckermelonen und enthält mehr Vitamin A, Kalium und Beta-Carotin.',
        'Welches Gemüse enthält je 100 g am meisten Vitamin E?', 'Pastinaken', 'Wirsing', 'Kürbis', 'Spargel', 2, 'Der tägliche Bedarf dieser antioxidativ wirkenden Vitamingruppe liegt bei 10 Milligramm, 100g Wirsing hat mit 2,5 mg den höchsten Vitamin-E-Gehalt. Nüsse und Öle enthalten wesentlich mehr Vitamin E.'
  ),
  (
    'Gesund in Dubai', '2015-08-03',
        'Welches Nahrungsmittel wird als “Brot der Wüste” bezeichnet?', 'Falafel', 'Fladenbrot', 'Datteln', 'Auberginen', 3, 'Datteln sind reich an Zucker und haben einen entsprechend hohen Kaloriengehalt, was ihnen den Namen „Brot der Wüste“ einbrachte. Ballaststoffe, Mineralstoffe sowie B-Vitamine machen sie zu einer gesunden Nascherei.',
        'Welches der folgenden typischen arabischen Gerichte enthält je 100 Gramm den höchsten Anteil an Eiweiß?', 'alle drei haben einen gleich hohen Anteil an Eiweiß', 'Kichererbsen', 'Rinderfilet', 'Hühnerbrustfilet', 1, 'Sowohl das Rinderfilet als auch das Hähnchenbrustfilet und die Kichererbsen enthalten 20 g Eiweiß. Mit 20 g enthalten Kichererbsen mehr Eiweiß als manche Fleischsorte. Hülsenfrüchte enthalten zwar relativ viele Kalorien, sättigen dafür mit ihrem hohen Ballaststoffgehalt schnell und lange.',
        'Eine der fünf Säulen des Islam ist der Fastenmonat “Ramadan”. Welche Aussage zum Fasten ist richtig?', 'Positive Wirkungen des Fastens sind bislang kaum belegt', 'Jeder Mensch kann jederzeit Fasten', 'Fasten ist prinzipiell ungefährlich', 'Alle Aussagen sind richtig', 1, 'Vor jeder Fastenkur wird eine ärztliche Kontrolle empfohlen, da es beim Fasten zu behandlungsbedürftigen Komplikationen kommen kann. Fasten wird von der DGE nicht als Maßnahme zur Gewichtsreduktion eingestuft.'
  ),
  (
    'Rund ums Ei', '2015-08-04',
        'Wie viele Eier pro Woche werden für eine ausgewogene Ernährung empfohlen?', '3-4 Eier', '6-8 Eier', '4-6 Eier', '1-3 Eier ', 4, 'Mehr als ein bis drei Eier pro Woche solltest Du nicht zu Dir nehmen, denn diese enthalten viel Cholesterin. Wenn Du die Eier mit Mayonnaise oder anderen Fetten/Ölen isst, nimmt Dein Körper wesentlich mehr unerwünschtes Cholesterin auf!',
        'Was verrät die erste Zahl auf dem Stempel vom Ei?', 'Herkunftsland', 'Haltungsform', 'Alter des Huhns', 'Nummer des Legeberiebs', 2, 'Die erste Zahl steht für die Haltungsform. Dabei wird unterschieden zwischen 0 (ökologische Erzeugung), 1 (Freilandhaltung), 2 (Bodenhaltung), 3 (Käfighaltung), wobei 0 am artgerechtesten ist.',
        'Welche Aussage stimmt nicht? Ein Ei der Gewichstklasse M...', 'deckt 33,8 % des täglichen Vitamin D Bedarfs', 'deckt 14 % des täglichen Eiweißbedarf', 'deckt 17 % des täglichen Vitamin B2-Bedarfs', 'deckt 15 % des täglichen Eisenbedarfs', 4, 'Das Ei ist ein reines Kraftpaket. Es bietet hochwertiges Eiweiß und eine Fülle anderer wertgebender Inhaltsstoffe. Jedoch deckt es nicht 15%, sondern nur 7% des täglichen Eiweißbedarfs.'
  ),
  (
    'Gesund in Shanghai', '2015-08-05',
        'Welcher der folgenden Begriffe bezeichnet eine traditionelle chinesische Bewegungs-, Konzentrations- und Meditationsform?', 'Qigong', 'Ài', 'Gongfu Cha', 'Beijing', 1, 'Qigong ist Teil traditioneller chinesischer Medizin. Dabei geht es neben Bewegung und Atmung um das Trainieren von Aufmerksamkeit und Haltung. T. Gongfu Cha bezeichnet eine chinesische Teezeremonie, Ài ist der chinesische Ausdruck für Liebe und Beijing ist der Name der chinesischen Hauptstadt.',
        'Ein Begleiter der meisten Mahlzeiten in Shanghai ist Reis. Welche der folgenden Reisarten ist am nährstoffreichsten?', 'Weißer Reis', 'Parboiled Reis', 'Brauner Reis', 'Alle haben den gleichen Nährstoffanteil', 3, 'Den höchsten Anteil an Vitalstoffen enthält der ungeschälte, braune Volkkornreis. Die wenigstens Nährstoffe sind im weißen Reis zu finden. Eine gute Alternative dazu ist der durch Dampf vorgegarte Reis, der circa 80% der natürlichen Vitalstoffe behält.',
        'China gilt als das Mutterland des Tees und hat eine vielfältige Teekultur. Tee wird in aller Welt einiges nachgesagt. Welche Aussage zu Inhaltsstoffen mancher Tees stimmt nicht?', 'Tannine entspannen Magen und Darm', 'Fluorid stärkt den Zahnschmelz', 'Die Aminosäure Theanin wirkt beruhigend', 'Catechine wirken wie ein Anti-Aging-Mittel', 1, 'Vor allem Schwarze und Grüne Tees enthalten Tannine, was deren herben Geschmack erklärt. Diese werden erst nach einer gewissen Ziehzeit freigesetzt. Sie können für Blähungen sorgen und die Resorption bestimmter Stoffe im Verdauungstrakt behindern.'
  ),
  (
    'Humor und Lachen', '2015-08-06',
        'Welches Hormon wird beim Lachen ausgeschüttet?', 'Endorphin', 'Kortisol', 'Östrogen', 'Adrenalin', 1, 'Beim Lachen werden die Stresshormone im Blut (Adrenalin und Kortisol) reduziert. Glückshormone (Endorphine) werden ausgeschüttet und Entspannung setzt ein.',
        'Wie viele Muskeln werden beim Lachen genutzt?', '37', '59', '80', '20', 3, 'Wenn ein Mensch lacht, werden in der Gesichtsregion 17 und am ganzen Körper sogar 80 Muskeln genutzt. Während die Bauchmuskulatur dabei angespannt ist, wird die Beinmuskulatur entspannt.',
        'Welche Wirkung haben Lachen und Humor auf den Körper?', 'senkt die Fähigkeit, Alkohol aufzunehmen', 'führt zu mehr Appetit', 'erhöht den Blutfluss und die Immunabwehr', 'alle der genannten', 3, 'Lachen und Humor haben positive Wirkungen auf die Gesundheit: Studien zeigen, dass dadurch Stress, Blutdruck und Herzrate abnehmen können. Also: heute schon gelacht? '
  ),
  (
    'Flüßigkeiten und Trinken', '2015-08-07',
        'Wie viel Flüssigkeit sollte ein erwachsener Mensch am Tag zu sich nehmen?', '1,5 l', '2,5 l', '3 l', '1 l', 1, 'Grundsätzlich gilt, dass man entsprechend des eigenen Durstgefühls trinken sollte. Als Richtwert empfiehlt die deutsche Gesellschaft für Ernährung 1,5 l pro Tag, an heißen Tagen bis zu 3 l.',
        'Der menschliche Körper besteht zu circa 70 % aus Wasser. Ab welchem Flüssigkeitsdefizit kann es zu einer Verringerung von Ausdauer- und Denkfähigkeit kommen?', 'ab 4 %', 'ab 8 %', 'ab 2%', 'ab 10%', 3, 'Bereits bei einem Flüssigkeitsdefizit von 2 % kann es zu einer Verminderung der Ausdauer und der Denkfähigkeit kommen. Lebensbedrohlich wird jedoch erst ein Defizit von 10 bis 15 %.',
        'Welche Getränke sind für Freizeitsportler geeignet?', 'isotonische Getränke', 'Mineralwasser und Saftschorlen', 'Kaffee, Cola, Koffeingetränke', 'Limonaden und Nektare', 2, 'Nur für Leistungssportler, die länger als 3 h pro Tag aktiv sind, machen isotonische Getränke wirklich Sinn. Freizeitsportler gleichen ihren Wasserhaushalt am besten mit Mineralwasser oder Saftschorlen aus.'
  ),
  (
    'Gesund in Berlin', '2015-08-08',
        'Wieviel Kalorien hat eine Portion Currywurst mit Pommes Frites?', '1060 kcal', '705 kcal', '825 kcal', '495 kcal', 3, 'Mit etwa 825 kcal gehört eine Portion Currywurst mit Pommes Frites zu den kalorienreichen Mahlzeiten. Der Fettanteil liegt mit 64 Gramm ebenfalls eher im oberen Bereich. Jedoch ist ein völliger Verzicht nicht nötig, vielmehr ist ein seltener und bewusster Genuss angeraten.',
        'Wieviel vegetarische Restaurants und Lokale gibt es in Berlin?', 'über 60', 'unter 20', 'etwa 90', 'etwa 30', 1, 'Berlin ist mit Abstand die vegetarierfreundlichste Stadt Deutschlands. Mit über 60 veganen und vegetarischen Gourmetrestaurants, Imbissständen, Fastfood-Lokalen, Eisdielen und Cafés bietet die Hauptstadt alles, was man sich nur wünschen kann.',
        'Wie lang ist der Flaeming-Skate vor den Toren Berlins?', '230 km', '150 km', '75 km', '370 km', 1, 'Etwa 50 km von Berlin entfernt liegt der Naturpark Flaeming verlaufen auf rund 230 Kilometern der Flaeming-Skate durch Wälder, Wiesen und Felder, fernab von störendem Straßenverkehr. Die zwei bis drei Meter breite Bahn aus feinstem Asphalt erlauben zahlreiche sportliche Aktivitäten.'
  ),
  (
    'Cholesterin', '2015-08-09',
        'Was wird auch als "schlechtes Cholesterin" bezeichnet?', 'FDH-Cholesterin', 'HDL-Cholesterin', 'LDL-Cholesterin', 'Cholesterin ist generell schlecht', 3, 'Das so genannte „schlechte” LDL-Cholesterin bringt das Fett in alle Körpergewebe. Unter bestimmten Umständen lagert sich das LDL-Cholesterin an den Gefäßwänden ab und es kann zu Gefäßverengungen kommen.',
        'Wieviel Cholesterin sollte man täglich maximal zu sich nehmen?', '250-300 mg', '450-500 mg', '650-700 mg', '850-900 mg', 1, '100 g Ei enthalten bereits 370 mg Cholesterin. Die Deutsche Herzstiftung empfiehlt vor allem Lebensmittel der Mittelmeerküche, die sich durch ihre einfach ungesättigten Fettsäuren günstig auf die Cholesterinwerte ausüben.',
        'Welches Lebensmittel enthält am wenigsten Cholesterin?', 'Salami', 'Hühnerei', 'Leberwurst', 'Camembert', 4, 'In der Tat hat das normale Ei mit rund 370 mg pro 100g den höchsten Cholesteringehalt. Die Leberwurst schlägt mit ebenfalls stolzen 205 mg zu Buche, die Salami mit 80 mg und Camembert mit gerade einmal 30 mg.'
  ),
  (
    'Stress lass nach', '2015-08-10',
        'Welches sind direkte Stresssymptome?', 'schnelle Herzfrequenz', 'schwindender Appetit', 'Schwitzen', 'alle drei', 4, 'Tatsächlich kann Stress zu allen genannten Symptomen führen. Diese Symptome werden durch Hormone hervorgerufen, die unsere Vorahnen darin unterstützten, Bedrohungen und Unsicherheiten zu bewältigen.',
        'Welches sind langfristige Stresssymptome?', 'Konzentrationsschwierigkeiten', 'Müdigkeit', 'Depression', 'alle drei', 4, 'Stress kann, wenn er dauerhaft besteht, zu Müdigkeit, Gereiztheit oder gar zur Entstehung von Erkrankungen wie Depression beitragen. Deshalb ist es wichtig, Stresssymptome möglichst frühzeitig wahrzunehmen und Maßnahmen zur Bewältigung zu ergreifen.',
        'Stress führt zu verfrühter Alterung durch...', 'zunehmende Isolation', 'die Entstehung von Falten', 'Beeinflussung des Immunsystems', 'mangelnde Aufnahme von Vitaminen', 3, 'Stress führt zur Beeinflussung des Immunsystems, indem es Herz-Kreislauf-Erkrankungen, Osteoporose oder bestimmte Krebserkrankungen begünstigt und darüber zur Alterung beiträgt.'
  ),
  (
    'Bewegung', '2015-08-11',
        'Wieviel Schritte sollte man pro Tag gehen?', '6.000', '10.000', '8.000', '12.000', 2, 'Grundsätzlich gilt das Prinzip “je mehr, desto besser”, d.h. je mehr Schritte am Tag gegangen werden, desto gesundheitsförderlicher ist dies. Ab 10.000 Schritten am Tag sprechen Wissenschaftler von einem aktiven Gesundheitsverhalten.',
        'Wie stark sollten sich Erwachsene körperlich bewegen?', 'mind. 45 Min. mäßig-intensive Bewegung an 2 Tagen/Woche', 'mind. 30 Min. mäßig-intensive Bewegung an 5 Tagen/Woche', 'mind. 15 Min. mäßig-intensive Bewegung an 7 Tagen/Woche', 'mind. 60 Min. mäßig-intensive Bewegung an 3 Tagen/Woche', 2, 'Basierend auf den Empfehlungen der Weltgesundheitsorganisation sollten sich Erwachsene an 5 Tagen in der Woche für mind. 30 Min. mäßig bis intensiv bewegen. Alternativ gilt auch eine intensive körperliche Betätigung (z.B. schnelles Joggen) für 20 Minuten an 3 Tagen in der Woche als ausreichend.',
        'Wieviel Prozent der deutschen Erwachsenen sind weniger als 2,5 Stunden pro Woche körperlich aktiv?', 'mehr als 75%', 'etwa als 25%', 'etwa 50%', 'weniger als 10%', 1, 'In der Tat erfüllen mehr als Dreiviertel aller Erwachsenen die Bewegungsempfehlungen nicht. Dies gilt insbesondere für Frauen, hier sind es sogar 85%.'
  ),
  (
    'Kalorien', '2015-08-12',
        'Welches der folgenden Lebensmittel hat die meisten Kalorien?', '100 g gekochte Nudeln', '100 g Banane', '100 g Putenbrust', '100 g eingelegte schwarze Oliven', 4, '100 Gramm eingelegte, schwarze Oliven bringen es auf 294 kcal. Damit sind sie deutlich kalorienreicher als Banane (95 kcal), Putenbrust (107 kcal) oder gekochte Nudeln (158 kcal).',
        'Welches der folgenden Lebensmittel hat die meisten Kalorien?', '500 g Apfel', '100 g Fruchtgummi', '100 g Schokolade', '100 g Erdnüsse', 4, '100 g Erdnüsse haben 620 kcal, Schokolade etwa 570 kcal, Fruchtgummi etwa 330 kcal und die fünffache Menge Äpfel bringt es gerade einmal auf etwa 275 kcal.',
        'Welches der folgenden Backwaren hat die meisten Kalorien?', '100 g Mehrkornbrötchen', '100 g Laugenstange', '100 g Schwarzbrot', '100 g Fladenbrot', 2, '100 g Laugenstange haben 320 kcal, Fladenbrot etwa 290 kcal, Mehrkornbrötchen etwa 260 kcal und Schwarzbrot bringt es auf etwa 200 kcal.'
  ),
  (
    'Gesund in Vilnius', '2015-08-13',
        'Welche Sportart gilt in Litauen als Nationalsport?', 'Basketball', 'Eishockey', 'Gewichtheben', 'Boxen', 1, 'Ein Basketballspiel versäumt man in Litauen nur selten. Kein anderer Sport berührt die Litauer mehr als das Basketball. Die Namen von Spielern wie Arvydas Sabonis, Šarūnas Jasikevičius, Arvydas Macijauskas, Žydrūnas Ilgauskas kennt in Litauen jeder. Dreimal holte sich die litauische Basketballmannschaft olympisches Bronze, dreimal konnte sie die Europa-Meisterschaft für sich entscheiden.',
        'Für die gesamte litauischen Küche gelten Kartoffeln als Grundlage. Wie viel Kalorien enthalten 100 Gramm Kartoffeln?', '35 kcal', '70 kcal', '140 kcal', '245 kcal', 2, 'Kartoffeln bestehen zu circa 78% aus Wasser und enthalten viele Mineralien sowie Vitamine. Ihr teilweise schlechter Ruf rührt von den sehr beliebten aber auch fettreichen Zubereitungsweisen, z. B. als Pommes Frites her.  Eine Portion der litauischen “Cepelinai” enthält 810 kcal.',
        'Alle fünf Jahre finden in Vilnius beispiellose nationale Gesangs- und Tanzfeste statt. Welches harmoniestiftende Hormon wird beim Singen freigesetzt?', 'Kortisol', 'Adrenalin', 'Östrogen', 'Oxytocin', 4, 'Bei Chorsängern konnte eine erhöhte Produktion des “Kuschelhormons” Oxytocin nachgewiesen werden. Zudem haben Studien gezeigt, dass die Konzentration des Stresshormons Kortisol beim bloßen Anhören von Musik noch stärker sinkt als beim Singen. Musik hören sowie Singen sind also durchaus empfehlenswerte Beschäftigungen.'
  ),
  (
    'Früher und heute', '2015-08-14',
        'Vor 20 Jahren hatte ein Cheeseburger im Durchschnitt 333 kcal. Wie viele sind es heute?', '700 kcal', '690 kcal', '590 kcal', '420 kcal', 3, 'Ein Cheeseburger hat heute im Durchschnitt 590 kcal. Um diese zusätzlichen 257 kcal zu verbrennen, kann man etwa 1,5 h Hanteltraining machen.',
        'Eine 225 ml Tasse Kaffee mit Milch und Zucker hatte vor 20 Jahren circa 45 kcal. Wie viele sind es heute für eine große Tasse (400 ml)?', '175 kcal', '90 kcal', '125 kcal', '150 kcal', 1, 'Heutige 400 ml Kaffeeportionen mit Milch und Zucker haben 175 Kalorien. Um die zusätzlichen 130 Kalorien kann man etwa 40 Minuten spazieren gehen.',
        'Zwei Stück Pepperoni-Pizza hatten vor 20 Jahren ungefähr 500 Kalorien. Wie viele Kalorien haben sie heute?', '750 kcal', '450 kcal', '850 kcal', '650 kcal', 3, 'Zwei große Stücke Pizza enthalten heute ungefähr 850 Kalorien. Spielt man eine Stunde Golf und trägt man dabei die Schläger und geht zu Fuß, kann man die 350 Extrakalorien verbrennen.'
  ),
  (
    'Fit in jedem Alter', '2015-08-15',
        'Was meint der Begriff "Lifetime-Sport"?', 'Sportarten, die nur von bestimmten Altersgruppen durchgeführt werden', 'Sportarten, die und bis ins hohe Alter ausgeübt werden können', 'Risikosportarten, die zur Lebenszeitverkürzung führen können', 'Sportarten, die im Durchschnitt jeder mindestens einmal im Leben ausübt', 2, 'Als Lifetime-Sport bezeichnete Sportarten können bis ins hohe Alter ausgeführt werden. Typische Beispiele sind Schwimmen oder Radfahren.',
        'Durch Bewegung oder Training kann die körperliche Leistungsfähigkeit verbessert werden. Bis zu welchem Alter ist das möglich?', 'bis 60 Jahre', 'bis ca. 55 Jahre', 'in jedem Alter', 'bis ca. 75 Jahre', 3, 'Es gibt keine Altersgrenze für körperliche Aktivität und gezieltes Training! Etwa ab dem 35. Lebensjahr beginnt die Leistungsfähigkeit des Körpers aufgrund natürlicher Alterungsprozesse abzunehmen. Körperliche Inaktivität fördert diese Abbauvorgänge, regelmäßige Übung verzögert sie!',
        'Ab welchem Alter wird ein Gesundheitsprüfung durch einen Arzt für Sportanfänger und Wiedereinsteiger empfohlen?', '35 Jahre', '45 Jahre', '55 Jahre', '65 Jahre', 1, 'Besonders für Anfänger und Wiedereinsteiger über 35 Jahre gilt: Erst zum Arzt und dann zum Sport! Eine Gesundheitsprüfung durch einen (Sport-)Arzt ist ebenso wichtig bei Vorerkrankungen oder Beschwerden sowie Risikofaktoren wie Rauchen oder Bluthochdruck.'
  );

#Insert Default Roles
INSERT INTO `healingo`.`Role`(`name`,`description`) VALUES
	('userType1','Type of User'),
	('userType2','Type of User'),
	('wvAdmin','Admin from webvariants'),
	('admin','Admin');

INSERT INTO `Content` (`editableBy` ,`key` , `title`, `markup`) VALUES
  (4, 'start', 'Wilkommen bei Healingo', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste recusandae assumenda delectus, cumque quis officiis. Minus explicabo reiciendis adipisci est consequuntur, hic, nobis cum autem deleniti odit, soluta nemo qui.'),
  (4, 'aboutus', 'Über uns', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste recusandae assumenda delectus, cumque quis officiis. Minus explicabo reiciendis adipisci est consequuntur, hic, nobis cum autem deleniti odit, soluta nemo qui.'),
  (4, 'datasecurity', 'Datenschutz', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste recusandae assumenda delectus, cumque quis officiis. Minus explicabo reiciendis adipisci est consequuntur, hic, nobis cum autem deleniti odit, soluta nemo qui.'),
  (4, 'howto', 'So funktionierts', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste recusandae assumenda delectus, cumque quis officiis. Minus explicabo reiciendis adipisci est consequuntur, hic, nobis cum autem deleniti odit, soluta nemo qui.'),
  (3, 'tos', 'Nutzungsbedingungen', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste recusandae assumenda delectus, cumque quis officiis. Minus explicabo reiciendis adipisci est consequuntur, hic, nobis cum autem deleniti odit, soluta nemo qui.'),
  (3, 'impressum', 'Impressum', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste recusandae assumenda delectus, cumque quis officiis. Minus explicabo reiciendis adipisci est consequuntur, hic, nobis cum autem deleniti odit, soluta nemo qui.'),
  (3, 'logout', 'Logout', 'Sie wurden erfolgreich ausgeloggt'),
  (4, 'faq', 'FAQ', '	Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt dolore optio harum odit nobis atque quas vero est provident tempora quisquam, magni labore voluptatum autem minima sapiente, natus, vitae officia!'),
  (4, 'userdeleted', 'User Account wurde gelöscht', 'Ihr Account wurde erfolgreich gelöscht');

INSERT INTO `FitbitDevice` (`deviceId`) VALUES
	('028030D89E82'), ('028030D89EC4'), ('028730D8A0D8'), ('02843126CCC0'), ('028731270165'), ('02873126DA57'), ('02873126CB39'), ('028270D89F9E'), ('02873126CD5A'), ('028271286F41'),
	('02827126EA3F'), ('02803126EB33'), ('028031272204'), ('0287312721C5'), ('028031270B20'), ('02843126A388'), ('02803126C156'), ('02803126EA3B'), ('02873126B44F'), ('02803127236D'),
	('0284315C8628'), ('0280315C7C0D'), ('0284315C6EA9'), ('0280315C8874'), ('0284315C6E9C'), ('02827156E8CA'), ('0280315693BD'), ('0282715C7BF7'), ('0284315C7D89'), ('02843156DF26'),
	('028271609BFB'), ('02803160C7EA'), ('02827160BAFB'), ('02827160C6DE'), ('0282715C7B10'), ('02827160C6B6'), ('028731609C49'), ('02873160BA47'), ('02827160BEAF'), ('02803160C74C'),
	('028031311E13'), ('02827130E9D9'), ('0282713120A0'), ('028031311E02'), ('028731270B8D'), ('028271311B5C'), ('028271311BB1'), ('028431311760'), ('02827130E82D'), ('028731347710'),
	('028271567BC4'), ('028271567AFE'), ('0287315C802C'), ('028271567B39'), ('02873154FE76'), ('028731567C38'), ('02803156888F'), ('0287315C80B4'), ('0284315C7EFC'), ('028031551509'),
	('02873130E012'), ('02873130EABF'), ('02873130E1B4'), ('028431310970'), ('02843130FC4C'), ('0282713112A5'), ('028431329227'), ('0280313109E4'), ('028271310429'), ('028431042312'),
	('0287315671F5'), ('0287315671DA'), ('028271567240'), ('028431567287'), ('028431567350'), ('02843156717C'), ('02827156709A'), ('02843156739C'), ('028031550FE3'), ('02843154E2CA'),
	('028031310DE5'), ('028271310925'), ('028271311145'), ('02843130F9DA'), ('028731312A0D'), ('02873131017A'), ('028031310A5A'), ('0280313109A1'), ('028271311134'), ('028731310169'),
	('0284315C71EC'), ('0282715C8206'), ('0280315C7D7F'), ('02827156C61A'), ('0282715C7CDA'), ('02873156C06E'), ('0284315C7953'), ('02843156C2E7'), ('02843156C462'), ('0287315C6FCD'),
	('0280313104A7'), ('02873130EAF1'), ('028031311CFD'), ('028731311BAF'), ('0284313104B3'), ('02803130EB4D'), ('02873130FF4D'), ('028031310598'), ('0280313101B4'), ('028731310696'),
	('028431551008'), ('02827156DF17'), ('0280315C7214'), ('0280315115EB'), ('0282715672DD'), ('0282715C7D05'), ('0282715C7D2C'), ('0282715C7C92'), ('028271550A22'), ('02803154E312'),
	('02843126E8CE'), ('028731272100'), ('028730D8A13C'), ('02803126DE49'), ('028431271896'), ('028430D6B8BD'), ('02843127104D'), ('02843126E924'), ('02803126B94D'), ('0282712870F1'),
	('0280315C7066'), ('02843156E47E'), ('0282715C7008'), ('02803156E6B2'), ('0284315C7089'), ('0282715C7D39'), ('0282715C7B49'), ('0280315C71BF'), ('02827156C5E6'), ('0287315C7BD4'),
	('02843126D4F8'), ('028271271D48'), ('02873126D78E'), ('02827126FB49'), ('02827126FB2E'), ('02827126FA3D'), ('02803126D711'), ('02827127178C'), ('02827126DFE3'), ('02827126E2B4'),
	('0287315C7BE2'), ('02827154FF7E'), ('028431550920'), ('02843154E290'), ('028271550A0B'), ('028431550FA2'), ('02843155094E'), ('0282715672C1'), ('0287315670F5'), ('02843154E272'),
	('028431609E9D'), ('02803160C665'), ('02843160BEF0'), ('02803156B715'), ('02843156B756'), ('02827160BE6E'), ('02803156B4A6'), ('02843156B536'), ('02843156B7B5'), ('0287315C8183'),
	('02803126C285'), ('02827126FB8C'), ('02843126A22E'), ('02873126CE68'), ('02803126BDE1'), ('02873126D4BA'), ('02843126BF40'), ('02827126FAA4'), ('02803126D94D'), ('02843126D525'),
	('02827126BCE9'), ('02873126BE80'), ('028031311BA9'), ('02873126FCB8'), ('028031270F30'), ('02843126CB13'), ('02843126CB27'), ('02827126FBA6'), ('02803126D869'), ('02827126D400'),
	('0287315C811B'), ('02843156D3F6'), ('0287315C7BFC'), ('02827156E8D7'), ('02843156E430'), ('0282715C7049'), ('02827156D583'), ('02803156DC8E'), ('0282715C81C5'), ('0284315C7ABA'),
	('0284315C7C3C'), ('0280315684EE'), ('0282715C7884'), ('028271609D25'), ('0284315510B5'), ('028271567839'), ('028431567BCC'), ('02803156E2D3'), ('0280315C6E81'), ('0284315C7C97'),
	('02827126A4D7'), ('02843126EA18'), ('02873126CF39'), ('02827126A52A'), ('0287312704CC'), ('02843126D512'), ('02803126EAFC'), ('02803126DF11'), ('02843126E94F'), ('02843126CA75'),
	('028731270B41'), ('02873127047F'), ('028731270B5B'), ('02843126CD25'), ('02827126DBAC'), ('02843126C9F9'), ('0280312721BA'), ('028430D87EA5'), ('02827126D3D1'), ('02873126B41F'),
	('02827130E7C7'), ('028731311B23'), ('028271310348'), ('0284313117A3'), ('02873130FD0C'), ('02873130FC10'), ('028031311E34'), ('028431312105'), ('02873130FD3E'), ('02873131140F'),
	('028731327326'), ('0287313119B3'), ('028271286E65'), ('028271267D2F'), ('028271311102'), ('02827126D54A'), ('02827126FB74'), ('0284313129E1'), ('02827126FA29'), ('02827126D4B3'),
	('0284315C868F'), ('0280315C85E7'), ('0287315C7A8C'), ('0282715C7E4C'), ('02843150C335'), ('028B9152CFD9'), ('0280315C7BE6'), ('0287315C7770'), ('02803156DC9B'), ('0280315C7DCC'),
	('02803156D8A7'), ('0282715C7D1F'), ('02873156830F'), ('0280315C7AED'), ('028271550018'), ('02827156720C'), ('0287315C7BBA'), ('0282715C7D53'), ('02843154E236'), ('0287315519B6'),
	('02873156DB26'), ('028B90BD0226'), ('02803156E145'), ('0284315C6D6A'), ('0284315C7096'), ('0280315C8584'), ('028270DAFD1F'), ('0282715C8029'), ('02803156E15E'), ('02843156E0B3'),
	('02843126D929'), ('028271270290'), ('028731270450'), ('0284312876FD'), ('02803126C4F7'), ('02827126D370'), ('028431271DF2'), ('02803126EB8B'), ('02803126A32A'), ('02843126E89E'),
	('02873156C57B'), ('02827156BAAE'), ('0280315C7059'), ('02843156E35C'), ('0287315C7BA0'), ('0282715C7C85'), ('02843156C738'), ('0282715C7064'), ('02827156E896'), ('02843154B376'),
	('074B3B4E3016'), ('02826E0AD295')
;
