import { Meteor } from 'meteor/meteor';
import { Tracks } from '../../api/tracks/tracks.js';

Meteor.startup(() => {

  if (Tracks.find().count() === 0){
    const data = [
      {
        title: "Everlong",
        author: "Foo Fighters",
        url: "https://soundcloud.com/foofighters/everlong",
      },
      {
        title: "Chop Suey!",
        author: "System of a Down",
        url: "https://soundcloud.com/nico-favor/system-of-a-down-chop-suey",
      },
      {
        title: "Scar Tissue",
        author: "Red Hot Chili Peppers",
        url: "https://soundcloud.com/edelson21/red-hot-chili-peppers-scar",
      },
      {
        title: "Wonderwall",
        author: "Oasis",
        url: "https://soundcloud.com/florian-n-3/wonderwall-oasis",
      },
      {
        title: "Instant Crush",
        author: "Daft Punk ",
        url: "https://soundcloud.com/aaron-gardea/daft-punk-instant-crush",
      },
      {
        title: "Hey You",
        author: "Pink Floyd",
        url: "https://soundcloud.com/yousefhisham/hey-you-pink-floyd"
      },
      {
        title: "Crazy",
        author: "Aerosmith",
        url: "https://soundcloud.com/eka-lord/aerosmith-crazy"
      },
      {
        title: "Sweet Child O' Mine",
        author: "Guns N' Roses",
        url: "https://soundcloud.com/universalmusicenterprises/sweet-child-o-mine"
      },
      {
        title: "Take On Me",
        author: "a-ha",
        url: "https://soundcloud.com/andymusic/aha-take-on-me-original"
      },
      {
        title: "Every Breath You Take",
        author: "The Police",
        url: "https://soundcloud.com/soulprovider88/the-police-every-breath-you-take-guitar-cover"
      },
      {
        title: "The Final Countdown",
        author: "Europe",
        url: "https://soundcloud.com/firstsummer/the-final-countdown-europe"
      },
      {
        title: "How You Remind Me",
        author: "Nickelback",
        url: "https://soundcloud.com/roadrunner-usa/nickelback-how-you-remind-me"
      },
      {
        title: "Eye of the Tiger",
        author: "The Scorpions",
        url: "https://soundcloud.com/hilma-bashay/the-scorpions-eye-of-the-tiger"
      },
      {
        title: "Losing My Religion",
        author: "REM",
        url: "https://soundcloud.com/roxana_styx/rem-losing-my-religion"
      },
      {
        title: "Come as you are",
        author: "Nirvana",
        url: "https://soundcloud.com/ankan-roy/come-as-you-are-nirvana"
      },
      {
        title: "In The End",
        author: "Linkin Park",
        url: "https://soundcloud.com/sgwd/linkinpark-in-the-end"
      },
      {
        title: "Right Here Waiting",
        author: "Richard Marx",
        url: "https://soundcloud.com/richardmarx/right-here-waiting-inside-my-head"
      },
      {
        title: "Back in Black",
        author: "AC/DC",
        url: "https://soundcloud.com/rich-rd-hanyu/acdc-back-in-black"
      },
      {
        title: "Bohemian Rhapsody",
        author: "Queen",
        url: "https://soundcloud.com/rizky-rilos/queen-bohemian-rhapsody"
      },
      {
        title: "Another One Bites the Dust",
        author: "Queen",
        url: "https://soundcloud.com/snoopdogg/queen-another-one-bites-the"
      },
      {
        title: "Imagine",
        author: "John Lennon",
        url: "https://soundcloud.com/gusta-j/john-lennon-imagine"
      },
      {
        title: "We Will Rock You",
        author: "Queen",
        url: "https://soundcloud.com/mona-hb/queen-we-will-rock-you"
      },
      {
        title: "I will always love you",
        author: "Whitney Houston",
        url: "https://soundcloud.com/jarodmultimedia/whitney-houston-i-will-always"
      },
      {
        title: "Hotel California",
        author: "Eagles",
        url: "https://soundcloud.com/ultimateeagles/hotel-california"
      },
      {
        title: "Night Fever",
        author: "Bee Gees",
        url: "https://soundcloud.com/beegeesofficial/bee-gees-night-fever"
      },
      {
        title: "Still Loving You",
        author: "Scorpions",
        url: "https://soundcloud.com/bareezaa/scorpions-still-loving-you"
      },
      {
        title: "Billie Jean",
        author: "Micheal Jackson",
        url: "https://soundcloud.com/reynaertjelle/jelle-billie-jean-micheal-jackson"
      },
      {
        title: "Remember The Time",
        author: "Micheal Jackson",
        url: "https://soundcloud.com/mjlive94/michael-jackson-remember-the"
      },
      {
        title: "Dust In The Wind",
        author: "Kansas",
        url: "https://soundcloud.com/kansasband/dust-in-the-wind"
      },
      {
        title: "Poison",
        author: "Alice Cooper",
        url: "https://soundcloud.com/user4141598/08-poison-alice-cooper"
      },
      {
        title: "Roxanne",
        author: "The Police",
        url: "https://soundcloud.com/neoneoptery/the-police-roxanne-2"
      },
      {
        title: "Hollywood Tonight",
        author: "Michael Jackson",
        url: "https://soundcloud.com/michaeljackson4/hollywood-tonight"
      },
      {
        title: "Burning Heart",
        author: "Survivor",
        url: "https://soundcloud.com/david-camilo-solano/burningheart"
      },
      {
        title: "Domino Dancing",
        author: "Pet Shop Boys",
        url: "https://soundcloud.com/synthesis-producciones/pet-shop-boys-domino-dancing"
      },
      {
        title: "Enjoy The Silence",
        author: "Depeche Mode",
        url: "https://soundcloud.com/victrs-mix/depeche-mode-enjoy-the-silence-extended-version"
      },
      {
        title: "Everybody Wants To Rule The World",
        author: "Tears For Fears",
        url: "https://soundcloud.com/aramisschultz/tears-for-fears-everybody"
      },
      {
        title: "With Or Without You",
        author: "U2",
        url: "https://soundcloud.com/lavation-u2-tribute/with-or-without-you"
      },
      {
        title: "Again",
        author: "Lenny Kravitz",
        url: "https://soundcloud.com/feferox/lenny-kravitz-again-acoustic"
      },
      {
        title: "Feel",
        author: "Robbie WIlliams",
        url: "https://soundcloud.com/phillippe92/feel-robbie-williams"
      },
      {
        title: "The Reason",
        author: "Hoobastank",
        url: "https://soundcloud.com/kevin-brian-2/the-reason-hoobastank"
      },
      {
        title: "Bring me to life",
        author: "Evanescence",
        url: "https://soundcloud.com/richo-adis-saputra/evanescence-bring-me-to-life"
      },
      {
        title: "Nothing Else Matters",
        author: "Metallica",
        url: "https://soundcloud.com/a-jameshetfield/metallica-nothing-else-matters"
      },
      {
        title: "In The Air Tonight",
        author: "Phil Collins",
        url: "https://soundcloud.com/clemenswenners/in-the-air-tonight"
      },
      {
        title: "Piano Man",
        author: "Billy Joel",
        url: "https://soundcloud.com/liamcoopermusic/piano-man-billy-joel"
      },
      {
        title: "Ain't No Sunshine",
        author: "Bill Withers",
        url: "https://soundcloud.com/massoudq/bill-withers-aint-no-sunshine"
      },
      {
        title: "Tiny Dancer",
        author: "Elton John",
        url: "https://soundcloud.com/edinburgh-sounds/tiny-dancer-elton-john"
      },
      {
        title: "Fortunate son",
        author: "Creedence Clearwater Revival",
        url: "https://soundcloud.com/brianpclark/fortunate-son"
      },
      {
        title: "Livin On A Prayer",
        author: "Bon Jovi",
        url: "https://soundcloud.com/poprocks-1/livin-on-a-prayer-bon-jovi"
      },
      {
        title: "Highway To Hell",
        author: "AC/DC",
        url: "https://soundcloud.com/lore-perez/ac-dc-highway-to-hell"
      },
      {
        title: "Hey Jude",
        author: "The Beatles",
        url: "https://soundcloud.com/liamcoopermusic/hey-jude-the-beatles"
      },
      {
        title: "Yesterday",
        author: "The Beatles",
        url: "https://soundcloud.com/armando-joins/the-beatles-yesterday"
      }



    ];

    let timestamp = (new Date()).getTime();


    data.forEach((tracks) => {
      const listId = Tracks.insert({
        title: tracks.title,
        author: tracks.author,
        url: tracks.url,
        createdAt: new Date(timestamp),
      });

    });

  }

});
