import { Filter } from "bad-words";


export const filter = new Filter();

const BAD_WORDS = [
  // English
  'fuck',
  'fucking',
  'shit',
  'bullshit',
  'bitch',
  'bastard',
  'asshole',
  'dick',
  'dumbass',
  'motherfucker',
  'cocksucker',
  'piss',
  'crap',
  'slut',
  'whore',
  'jerk',
  'idiot',
  'stupid',
  'moron',
  'retard',

  // Filipino / Tagalog
  'putangina',
  'puta',
  'putang ina',
  'gago',
  'gaga',
  'tanga',
  'ulol',
  'tarantado',
  'leche',
  'lintik',
  'bwisit',
  'buwisit',
  'hayop',
  'hayup',
  'pakyu',
  'pakshet',
  'siraulo',

  // Bisaya / Cebuano
  'yawa',
  'yawaa',
  'buang',
  'buangon',
  'pisti',
  'peste',
  'yati',
  'iyot',
  'bilat',
  'yuta',
  'atay'
];

filter.addWords(...BAD_WORDS);

