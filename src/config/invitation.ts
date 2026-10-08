// src/config/invitation.ts
export const invitation = {
  couple: { first: "Aminul Islam", second: "Ayesha Humayra" },
  eventDateISO: "2026-10-23T19:00:00+06:00", // Asia/Dhaka
  displayDate: "October 23, 2026",
  cover: { line: "Cordially Invites", button: "Open" },
  welcome: "Welcome to our wedding",
  ceremony: {
    heading: "Ceremony Info",
    left: {
      father: "Md. Hassan",
      mother: "Jasmin Begum",
      address: "272/27,R-6, Baten Nagar, Mazar Road, Mirpur-1",
    },
    right: {
      father: "Yousuf Chowdhury",
      mother: "Jasmin Sultana",
      address: "H-9,R-9,Block-D,Mirpur-1",
    },
  },
  announce: ["We joyfully announce", "the wedding of our children"],
  reception: {
    heading: "Reception Info",
    sub: "The reception will take place at:",
    time: "7:00 PM",
    weekday: "Friday",
    day: "23",
    month: "October",
    year: "2026",
  },
  countdownLabel: "Countdown",
  venue: {
    name: "Mirpur Convention Center",
    address: "7th Floor, Mirpur Shopping Center Complex, Dhaka 1216",
    mapQuery: "Mirpur Shopping Center Complex, Dhaka 1216",
  },
  schedule: [
    { time: "6:30 PM", label: "Welcome" },
    { time: "7:00 PM", label: "Reception" },
    { time: "9:00 PM", label: "Main Course" },
    { time: "11:00 PM", label: "Farewell" },
  ],
  guestbook: {
    heading: "Guestbook",
    namePlaceholder: "Enter your name*",
    wishPlaceholder: "Enter your wishes*",
    send: "Send Wishes",
    empty: "No wishes yet. Be the first!",
  },
  footer: "Your presence would be the greatest gift we could receive!",
  music: {
    src: "/music/wedding-song.mp3",
    title: "Wedding Song",
    loop: true,
    volume: 0.7,
  },
};
