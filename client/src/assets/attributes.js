export const attributes = [
  {
    name: 'Acousticness',
    description: 'A confidence measure from 0 to 100 of whether the track is acoustic. ',
  },
  {
    name: 'Danceability',
    description: 'Danceability describes how suitable a track is for dancing based on a combination of musical elements including tempo, rhythm stability, beat strength, and overall regularity.',
  },
  {
    name: 'Energy',
    description: 'Energy represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale. Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy.',
  },
  {
    name: 'Instrumentalness',
    description: 'Predicts whether a track contains no vocals. “Ooh” and “aah” sounds are treated as instrumental in this context. Rap or spoken word tracks are clearly “vocal”. The closer the instrumentalness value is to 100, the greater likelihood the track contains no vocal content. ',
  },
  {
    name: 'Speechiness',
    description: '	Speechiness detects the presence of spoken words in a track. The more exclusively speech-like the recording (e.g. talk show, audio book, poetry), the closer to 100 the attribute value. Values above 66 describe tracks that are probably made entirely of spoken words. Values between 33 and 66 describe tracks that may contain both music and speech, either in sections or layered, including such cases as rap music. Values below 33 most likely represent music and other non-speech-like tracks.',
  },
  {
    name: 'Tempo',
    description: 'The overall estimated tempo of a track in beats per minute (BPM). In musical terminology, tempo is the speed or pace of a given piece and derives directly from the average beat duration.',
  },
  {
    name: 'Valence',
    description: 'Valence represents the musical positiveness conveyed by a track. Tracks with high valence sound more positive (e.g. happy, cheerful, euphoric), while tracks with low valence sound more negative (e.g. sad, depressed, angry).',
  }
]