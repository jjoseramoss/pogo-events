const events = [
  {
    id: 1,
    title: "Eevee Community Afternoon",
    category: "community",
    bonus: "Extra catch XP",
  },
  {
    id: 2,
    title: "Gengar Raid Evening",
    category: "raid",
    bonus: "Extra raid XP",
  },
  {
    id: 3,
    title: "Magikarp Spotlight",
    category: "spotlight",
    bonus: "Double catch Candy",
  },
];

// function filterEventsByCategory(events, category) {
//   // return only the events whose category matches.
//   filtered = [];
//   if (events.length <= 0) return [];

//   events.forEach((e) => {
//     if (e.category === category) {
//       filtered.push(e);
//     }
//   });

//   return filtered;
// }

//Using filter method
function filterEventsByCategory(events, categories) {
  // return only the events whose category matches.
  if (categories.length <= 0) return events;

  const filtered = events.filter((event) =>
    categories.includes(event.category),
  );

  return filtered;
}

console.log(filterEventsByCategory(events, ["community", "raid"])); // return community and raid object
console.log(filterEventsByCategory(events, "unknown")); // return []
console.log(filterEventsByCategory(events, [])); // return all
console.log(events.length); // return 3
