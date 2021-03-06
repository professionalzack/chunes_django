function tuneParser(tuneblock){

  let cut = tuneblock.split(/\n\s*\n/)
  let finishedTunes = []

  cut.forEach(tune=>{
    tune=tune.split('\n')
    tuneObj = {}
    tuneBody = []
    header = []
    info = []
    tune.forEach(line=>{
      if(line.includes('|')){
        tuneBody.push(line)
        }else{
      switch (line.slice(0,2)) {
        case 'X:':
          return
        case 'T:':
          tuneObj['title'] = line.slice(2)
          break;
        case 'M:':
          tuneObj['time_signature'] = line.slice(2)
          break;
        case 'L:':
          tuneObj['default_note_length'] = line.slice(2)
          break;
        case 'K:':
          tuneObj['key_signature'] = line.slice(2)
          break;
        case 'R:':
          tuneObj['tune_type'] = line.slice(2)
          break;
        default:
          info.push(line)

      }}
    })
    if(info.length)tuneObj['additional_info'] = info.join('\n')
    if(tuneBody.length){
      tuneObj['melody_line'] = tuneBody.join('\n')
      tuneObj['is_public'] = true
      if(tuneObj.title){
        finishedTunes.push(tuneObj)
      }
    }
  })
  return finishedTunes
}


function dber(ABC){
  let pk = 5
  const finishedTunes = tuneParser(ABC)
  // const finishedTunes = ABC
  const tunes = []
  const posts = []

  const profiles = [
    {pk: 25, library:[], lpk: 1},
    {pk: 28, library:[], lpk: 2},
    {pk: 11, library:[], lpk: 3},
    {pk: 19, library:[], lpk: 4},
    {pk: 15, library:[], lpk: 5}
  ]

  finishedTunes.forEach(tune => {
    const profile = profiles[Math.floor(Math.random()*5)]
    profile.library.push(pk++)
    tune["poster"] = profile.pk
    tunes.push(`{"model": "chunes_api.tune", "pk": ${pk}, "fields": ${JSON.stringify(tune)}},`)
    posts.push(`{"model": "chunes_api.post", "pk": ${pk}, "fields": {"poster":${profile.pk}, "tune":${pk}, "content": "just like the tune", "media":null, "time_stamp" :"2019-05-21T01:00:00+03:00"}},`)
  })
  
  
tunes.forEach(tune=>console.log(tune))
profiles.forEach(p=>console.log(`{"model": "chunes_api.library", "pk": ${p.lpk}, "fields": {"profile": ${p.pk}, "tunes": [${p.library}]}},`))
posts.forEach(post=>console.log(post))

}

dber(`X: 1
T:Egan's Polka
T:Kerry Polka
R:Polka
M:2/4
L:1/16
K:D
|:f2A2 B2A2|f2A2 B2A2|d4 e3f|e2d2 B2A2|
f2A2 B2A2|f2A2 B2A2|d4 e3f|e2d2 d4:|
|:f2a2 f2e2|e2d2 B2A2|d4 e3f|e2d2 B2A2|
f2a2 f2e2|e2d2 B2A2|d4 e3f|e2d2 d4:|

X: 2
T:Maggie in the Woods
T:Knocknaborough Polka
R:Polka
C:Trad
M:C|
L:1/8
K:D
|:G2D2 G3A|B2d2 e4|d2B2 BAGA|B2A2 A4|
G2D2 G3A|B2d2 e4|d2B2 A2BA|G4 G4:|
|:g2f2 e2d2|e2f2 g2e2|d2B2 BAGA|B2A2 A4|
g2f2 e2d2|e2f2 g2e2|d2B2 A2BA|G4 G4:|

X: 3
T:Denis Murphy's Polka
R:polka
S:John B. Walsh
M:2/4
L:1/16
K:D
|:fgfe d3B|A2D2 F2A2|G2E2 e3d|c2B2 B2A2|
fgfe d3B|A2D2 F2A2|G2E2 e3f|e2d2 d3:|
|:B|A2f2 fef2|A2g2 gfg2|A2f2 fef2|efed B2A2|
A2f2 fef2|A2g2 g3a|b2a2 g2c2|e2d2 d3:|

X: 4
T:John Ryan's Polka
T:Forty Pound Float
R:Polka
C:Trad
S:Black Book
M:2/4
L:1/16
K:D
|:d2d2 BcdB|A2F2 A2F2|d2d2 BcdB|A2F2 E2D2|
d2d2 BcdB|A2F2 A2de|f2d2 edc2|d4 d2:|
|:de|f2d2 d2ef|g2f2 e2de|f2d2 A2d2|f2df a3g|
f2d2 d2ef|g2f2 e2de|f2d2 edc2|[1 d4 d2:|[2 d4 d4

X: 5
T:Salmon Tails Up the Water
R:Polka
C:via PR
S:Nottingham Music Database
M:2/4
L:1/8
K:G
GE|"G"D>E DB,|DG G>A|Bd "D"AB/2A/2|"C"GE "D"cE|
"G"D>E DB,|DG G>A|Bd "D7"AB/2A/2|"G"G2 G2:|
Bd d2|"C"ce e2|"G"dB "D"AB/2A/2|"C"GE "D"D2|
"G"Bd d2|"C"ce e>f|"G"ge fd|"Em"e2 e>f|
ge fd|e/f/e/d/ B>A|Bd AB/A/|GE cE|
"G"D>E DB,|DG G>A|Bd AB/A/|G2 G2:|

X: 6
T:Harper's Frolic
R:Polka
M:2/4
L:1/8
K:D
A/2G/2|:FA DA/2G/2|FA Dd|cd ec|d/2c/2d/2e/2 dA/2G/2|
FA DA/2G/2|FA Dd|cd e/2d/2c|[1 d2 dA/2G/2:|[2 d2 d>e||
|:fd d/2e/2f|ge e/2f/2g|fd df|e/2d/2c/2B/2 A3/e/|
fd d/2e/2f|ge e/2f/2g|f/2e/2d e/2d/2c|[1 d2 d3/e/:|[2 d2 d2:|

X: 7
T:Bill Sullivan's Polka
R:polka
C:trad.
S:Kevin Burke "If the Cap fits" and Cliff Cole
M:2/4
L:1/16
K:G
|:g4 g3e|d2B2 g3e|d2B2 g3e|d2B2 A2G2|
g4 g3e|d2B2 g4|B2d2 A3B|1 A2G2 G4:|2 A2G2 G3A||
|:B2d2 d3B|c2e2 e3c|B2d2 d2GA|B2A2 A2GA|
B2d2 d3B|c2e2 e4|B2d2 A3B|A2G2 G4:|

X: 8
T:Ger the Rigger
R:polka
M:2/4
L:1/16
Q:1/4=121
K:A
|e2A2 e2A2|efed c2A2|d4 defg|a2e2 f2e2|
e2A2 e2A2|efed c2A2|d2fd c2ec|BABc A2:|
|:(3e2f2g2|a2e2 fece|a2e2 fecA|d4 defg|a2e2 f2e2|
a2e2 fece|a2e2 fecA|d2fd c2ec|BABc A2:|

X: 9
T:Ballydesmond Polkas
R:polka
Z: two polkas played as one 4-part polka
M:2/4
L:1/8
K:G
|:"Am"EA AB|cd e2|"G"G>F GA|GE ED|
"Am"EA AB|cd e>f|"G"ge dB|"Am"A2 A2:|
|:a>g ab|ag "D"ef|"G"g>f ga|ge ed|
"Am"ea ab|ag "D"ef|"G"ge dB|"Am"A2 A2:|
"Am"cd/c/ "G"Bc/B/|"F"AB/A/ "Em"G>A|"G"B/c/d "D"ed|"G"g3d|
"Am"ea ge|"G"dB GA/B/|"Am"ce "G"dB|"Am"A2 A2:|
|:ea ag/e/|"G"dg gd|"Am"ea ab|"G"g>f gd|
"Am"ea ge|"G"dB GA/B/|"Am"ce "G"dB|"Am"A2 A2:|

X: 10
T:Charlie Harris' Polka
T:Kevin Burke Polka #1
R:Polka
D:Kevin Burke, "If the Cap Fits"
M:2/4
L:1/8
K:D
B/|AF DF|EF DF|AF AB|e2 d>B|AF DF|EF DF| AF AB| Bd d3/2 :|
A/|d2 fd|ef dB|AF AB|e2 dB|d2 fd|ef dB|AF AB|Bd d>A||
d2 fd|ef dB|AF AB|e2 dB|df fe/2f/2|af fe/2f/2|af ef|d2 d3/2|]

X: 11
T:Kevin Burke Polka #2
R:Polka
M:2/4
L:1/8
K:Bm
|:B2 Bc|dB Bd|cA Ac|d/2c/2B/2A/2 BF|B2 Bc|dB Bd|ef/2e/2 dc|BA BF:|
|:f2 df|ec cd|ef/2e/2 dc|Bc de|f2 df|ec cd|ef/2e/2 dc|BA B2:|

X: 12
T:Jessica's Polka
T:Kevin Burke Polka #3
R:Polka
M:2/4
L:1/8
K:A
|:ef/2e/2 ce|fe Bc|A>B cA|ec B2|ef/2e/2 ce|fe Bc|A>B cA|FA E2:|
|:FB AF|cB A2|ef/2e/2 ce|ag f2|ef/2e/2 ce|fe Bc|A>B cA|FA E2:|

X: 13
T:Newfoundland set tunes
R:Polka
S:Ryan's Fancy record
Z:Added by alf.warnock@rogers.com
M:2/4
L:1/16
K:D
|:"1st tune"D2F2 E2FE|D2d2 B2dB|A2F2 E2DE|F2D2 B,2A,2|
D2F2 E2FE|D2d2 B2dB|A2F2 E2DE|F2D2 D4:|
A2|F2A2 d3A|F2A2 d3A|F2A2 d2B2|c4 c3d|
efed c2B2|ABAG E2FG|A2F2 E2FE|D4 D2:|
"2nd tune"F2A2 G2B2|F2A2 f4|f2ef gfe2|e2de fedA|
F2A2 G2B2|F2A2 f4|f2ef gec2|e2d2 d4:|
AB|d4 cdcB|A2d2 F3G|A2G2 E2G2|B2A2 F2AB|
d4 cdcB|A2d2 F3G|A2G2 E2FE|D4 D2:|

X: 14
T:Running the Goat #1
R:Polka
N:Running the Goat is the name of a set dance from Harbour Deep,
N:Newfoundland. This is originally the tune that was played there for the
N:dance.  St John's musicians added the other three tunes.  The B part
N:doesn't get repeated.
Z:Added by alf.warnock@rogers.com
M:2/4
L:1/8
K:G
|:E>F ED|(3EFG A2|BG GA|BD E2|
DE FG|ABA2|BD (3EFE|D2D2:||
Bddc|BcA2|BG GA|BGA2|
Bddc|BcA2|BD (3EFE|D2D2|]

X: 15
T:Running the Goat #2
R:Polka
Z:Added by alf.warnock@rogers.com
M:2/4
L:1/8
K:C
|:CE GE|ED ED|CE GE|ED D2|
CE GE|ED EG|A>B AG|ED C2:||
:Cc Bc|E2 ED|Cc Bc|d2d2|
Cc Bc|E2 EG|A>B AG|ED C2:|

X: 16
T:Running the Goat #3
T:She said she couldn't Dance
T:Ringle Dingle Daddy
R:Polka
Z:Added by alf.warnock@rogers.com
M:2/4
L:1/8
K:G
|:dB GA|B2 Bc|dB GA|BA A2|
dB GA|B2 Bc|de dB|AG G2:|
|:dd ef|g2g2|dd ef|ed d2|
dd ef |g2 g2|dedB|AG G2:|

X: 17
T:Shooting the Bull
T:Running the Goat #4
R:Polka
C:Geoff Panting
N:An original tune from Geoff Panting of the group Rawlin's Cross
Z:Added by alf.warnock@rogers.com
M:2/4
L:1/8
K:Bm
|:BE EA|Bc dc|BE EB|A2 A2|
BE EA|Bc dc|Bc/B/ AF|E2E2:|
|:Be ed|BA A2|Be ed|Bc d2|
Be ed|BA A2|Bc/B/ AF|E2E2:|

X: 18
T:Top of Maol
R:Polka
S:Matt Cranitch Book
Z:Added by alf.warnock@rogers.com
M:2/4
L:1/8
K:G
|:A2 AB/d/|ed Bd|G2 G>A|Bd BG|
A2 AB/d/|ed Bd|e/f/g/e/ dB|A2 A2:|
|:ea ag/a/|ba g2|ef g>a|ge ed|
ea ag/a/|bag>f|e/f/g/e/ dB|A2A2:|

X: 19
T:Sean McGovern's Polka
R:Polka
S:Matt Cranitch Book
Z:Added by alf.warnock@rogers.com
M:2/4
L:1/8
K:D
B|AD FA|GF EF/G/|AD FA|d2 c/d/c/B/|
AD FA|GF E>d|ce Ac|d2 d3/2:|
|e/|fd gf |e/f/e/c/ Ae|fd gf|e2 a/b/a/g/|
fd gf|ec A>B|ce ce|d2 d3/2:|

X: 20
T:D\'alaigh's Polka
R:Polka
S:Matt Cranitch book
Z:Added by alf.warnock@rogers.com
M:2/4
L:1/8
K:G
|:eA {Bd}BA|eA {Bd}BA|eA {Bd}BA|G2 GB/d/|
eA {Bd}BA|eA {Bd}BA|Be dB|A2 A2:|
|:ed ef|ga ga/g/|ed ef |az g2{ag}|
ed ef|ga g/a/g/e/|dB gB|A2A2:|

X: 21
T:Banks of the Quay
R:Polka
M:4/4
L:1/4
K:G
|:DGB>B|cAB2|BA/G/FG|AGFE|
DGB>B|cAB2|BA/G/FG|AGG>F:|
d2d>d|edd>B|AGFG|[1AGG>B|
d2d>d|edd>B|AGFG|AGG>B:|[2AGFE|
DGB>B|cAB2|BA/G/FG|AGG>F:|

X: 22
T:Crucaharan Cross
R:Polka
M:2/4
L:1/8
K:G
B/A/|:GdBd|G>AGe|dBB/A/G/A/|BAAB/A/|
GdBd|G>AGe|dBAB/A/|G2Gz:|
:e>d e/f/g|G>AGe|dB B/A/G/A/|BAAd|
e>d e/f/g|G>AGe|dBAB/A/|G2Gz:

X: 23
T:Herb Reid's
R:Polka
O:Newfoundland
M:2/4
L:1/8
K:D
|:DF/G/ AF|EF GB|AB cd|ed cA|
DF/G/ AF|EF GB|AB ce|d2 d2:||
|:df fe|dc BA|Be ed|cB Ac|
df fe|dc BA|Bc/d/ cd/e/|d2 d2:|

X: 24
T:Joan O'Neills #1
R:Polka
Z:added by Alf Warnock - alf0@rogers.com - www.alfwarnock.info/alfs
M:2/4
L:1/8
K:D
|"D"AD FG|A2 A>B|"A7"c/B/A GF|EF GB|\
"D"AD FG|A2 A>B|"A7"c/B/A GE|"D"ED D2:|
"D"Ad de|f2 e>d|"A7"c/B/A AB|cd ec|\
"D"Ad de|f2 e>d|"A7"c/B/A GE|"D"ED D2:|

X: 25
T:Joan O'Neills #2
R:Polka
Z:added by Alf Warnock - alf0@rogers.com - www.alfwarnock.info/alfs
M:2/4
L:1/8
K:Bm
A/2|"Bm"B>A B>A|F/2G/2A "D"D>A|"Bm"B>A B>A|B/2c/2d "A"ed|\
"Bm"B>A B>A|F/2G/2A "D"DE|FD AF|"Em"E2 E3/2:|
"Em"A/|B/c/d e>f|ed B>A|B/2c/2d e>f|ed B>c|\
"D"d>e dB|AF DE|FD AF|"Em"E2 E3/2:|

X: 26
T:Joan O'Neills #3
R:polka
Z:added by Alf Warnock - alf0@rogers.com - www.alfwarnock.info/alfs
M:2/4
L:1/16
K:A
| "A"A2c2 E2F2|"F#m"A4 A3f|"A"e2c2 B2AB|e2c2 "E7"B2c2|\
"A"A2c2 E2F2|"F#m"A4 A3f|"A"e2c2 B2AB|c2A2 A4:|
c2e2 c2e2|a4 a3f|e2c2 B2Ac|e2c2 B2A2|\
c2e2 c2e2|a4 a2f2|e2c2 "E7"B2AB|c2A2 A3B:|

X: 27
T:Newmarket Polka #1
R:polka
Z:added by Alf Warnock - alf0@rogers.com - www.alfwarnock.info/alfs
M:2/4
L:1/16
K:A
| "A"A3B c2B2|"F#m"A2F2 F2E2|"A6"C2E2 F2E2|C2E2 F2E2|\
"A"A3B c2B2|"F#m"A2F2 F2E2|"A"C2E2 F2E2|A4 A4:|
"A"a4 g2a2|b2a2 a2f2|e2c2 B2c2|A2B2 c2e2|\
a4 g2a2|b2a2 a2f2|"E"e2c2 B2c2|"A"A4 A4:|

X: 28
T:Newmarket Polka #2
R:polka
Z:added by Alf Warnock - alf0@rogers.com - www.alfwarnock.info/alfs
M:2/4
L:1/16
K:D
| "D"D3E F2A2|d2c2 B2A2|"A7"E3F G2E2|"D"B2A2 F4|\
"D"D3E F2A2|d2c2 B2A2|"A"E3F G2E2|"D"B2A2 D4:|
"D"f2A2 f2A2|f2A2 f3f|"A"e2B2 e2B2|e2B2 e3e|\
"D"f2A2 f2A2|f2A2 f3f|"A"e2B2 c2d2|"D"e2d2 d4:|

X: 29
T:Newmarket Polka #3
R:polka
Z:added by Alf Warnock - alf0@rogers.com - www.alfwarnock.info/alfs
M:2/4
L:1/16
K:A
| "A"E3E E2c2|B2A2 B2c2|E3E E2c2|"F#m"B2A2 F4|\
"A"E3E E2c2|B2A2 B2c2|"E"e3f e2c2|"A"B2A2 A4:|
"A"c3e e2c2|B2A2 F2E2|c3e e2c2|"F#m"B2A2 A3B|\
"A"c3e e2c2|B2A2 F2A2|E3E E2c2|"E"B2A2 "A"A4:|

X: 30
T:Mussels in the Corner
R:polka
Z:added by Alf Warnock - alf0@rogers.com - www.alfwarnock.info/alfs
M:2/4
L:1/16
K:A
|"A"A2E2 A2B2|c2e2 "D"f4|"A"e2c2 B2AB|"E7"c2B2 B4|
"A"A2E2 A2B2|c2e2 "D"f4|"A"e2c2 "E7"B2cB|"A"A4 A4:|
"A"a2g2 f2e2|c2e2 "D"f4|"A"e2c2 B2AB|"E7"c2B2 B4|
|[1"A"a2g2 f2e2|c2e2 "D"f4|
"A"e2c2 "E7"B2cB|"A"A4 A4:|
|[2"A"A2E2 A2B2|c2e2 "D"f4|"A"e2c2 "E7"B2cB|"A"A4 A4|]

X: 31
T:Salmon Tails Up the Water
R:Polka
C:via PR
S:Nottingham Music Database
M:2/4
L:1/8
K:A
AF|"A"E>F EC|EA A>B|ce "E"Bc/2B/2|"D"AF "E"dF|\
"A"E>F EC|EA A>B|ce "E7"Bc/2B/2|"A"A2 A2:|
ce e2|"D"df f2|"A"ec "E"Bc/2B/2|"D"AF "E"E2|\
"A"ce e2|"D"df f>g|"A"af ge|"F#m"f2 f>g|
af ge|f/g/f/e/ c>B|ce Bc/B/|AF dF|\
"A"E>F EC|EA A>B|ce Bc/B/|A2 A2:|

X: 32
T:Maggie in the Wood
R:Polka
Z:As played by the CHB
M:2/4
L:1/8
K:G
B/2A/2|"G"GD GA|"Em"Be eg/2e/2|"G"dB B/2A/2G/2A/2|"D"BA AB/2A/2|
"G"GD GA|"Em"Be eg/2e/2|"G"dB "D"AB/2A/2|"G"G3:|
|:e/2f/2|gf "C"ed|"D"ef "G"g>e|dB B/2A/2G/2A/2|
|[1 "D"BA Ae/2f/2|"G"gf "C"ed|"D"ef "G"g>e|dB "D"AB/2A/2|"G"G3:|
|[2 "D"BA AB/2A/2|"G"GD GA|"Em"Be eg/2e/2|"G"dB "D"AB/2A/2|"G"G3||

X: 33
T:McKeown's
M:2/4
L:1/8
R:polka
K:D
|:AF BF|AF BF|AB cd|dc E>F|GE BE|GE BE|GA Bc|BA F>G|
AF BF|AF BF|AB cd|eB B2|e>d cB|AF A2|AA Bc|d2 d2:|
|:ba fd|cB B2|B>A Bc|BA A2|A>B Ac|d>e fg|a>^g ab|a4|
d>c dc|ed cB|B>A FA|Bc E2|E>F GA|B>c dB|A/B/A G/F/E|D4:|
|:f2 ef/e/|dd d2|dc/d/ ed|dc c2|g2 fg/f/|ee e2|ed/e/ fe|dc BA|
fg/f/ ef/e/|dd d2|dc/d/ ed|dc c2|B>A Bd|e>c ef|ed cB|A4:|
|:FA FE|DF AF|AG GF|G3 A|B2 BA|BB cB|BA A^G|A2 Bc|
d2 dc/d/|ed AB|cB BA|B4|cc c>B|AA Bc|ed dc|d4:|

`)