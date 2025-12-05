import React, { useState, useEffect } from 'react';
import { Heart, SkipForward, TrendingUp, User, Home, Flame, Clock, UserPlus, ThumbsDown, Store, Trophy, Coins, DollarSign, Gift, Zap, TrendingDown, Award, ExternalLink, Youtube, Twitch as TwitchIcon, CheckCircle, Target, Calendar } from 'lucide-react';

const DumbfundedApp = () => {
  const [currentView, setCurrentView] = useState('feed');
  const [currentUser, setCurrentUser] = useState(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [watchTime, setWatchTime] = useState(0);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [generationNotification, setGenerationNotification] = useState('');
  const [selectedCreator, setSelectedCreator] = useState(null);
  const [liveViewerCounts, setLiveViewerCounts] = useState({});
  const [recentDonation, setRecentDonation] = useState(null);
  
  // Currency & Wallet
  const [dumbsUps, setDumbsUps] = useState(500);
  const [dumbCoins, setDumbCoins] = useState(0);
  const [totalEarned, setTotalEarned] = useState(0);
  const [totalPurchased, setTotalPurchased] = useState(0);
  const [totalDonatedUps, setTotalDonatedUps] = useState(0);
  const [totalDonatedCoins, setTotalDonatedCoins] = useState(0);
  
  const [userEngagement, setUserEngagement] = useState({
    likes: [],
    skips: [],
    notInterested: [],
    following: [],
    donationsUps: {},
    donationsCoins: {},
    watchTimes: {},
    tagWeights: {}
  });

  // Creator profiles database
  const [creatorProfiles] = useState({
    "GamerGrit": {
      name: "GamerGrit",
      avatar: "🎮",
      bio: "Hardcore gamer pushing the limits of what's possible. No challenge too difficult, no boss too hard.",
      joinedDate: "Jan 2024",
      totalRaised: 45680,
      challengesCompleted: 127,
      followers: 15420,
      isLive: true,
      currentChallenge: "Beat Elden Ring Blindfolded",
      platforms: { twitch: "gamergrit", youtube: "gamergritofficial" },
      badges: ["🏆 100+ Challenges", "💎 $25k+ Raised", "⚡ Speed Demon", "🔥 30 Day Streak"],
      pastChallenges: [
        { title: "Beat Dark Souls Blindfolded", outcome: "✅ Completed", raised: 6780, date: "2 days ago" },
        { title: "Sekiro No Damage Run", outcome: "✅ Completed", raised: 8920, date: "1 week ago" },
        { title: "All Souls Games Marathon", outcome: "✅ Completed", raised: 12340, date: "2 weeks ago" },
        { title: "Cuphead Expert Mode", outcome: "❌ Failed", raised: 3210, date: "3 weeks ago" }
      ]
    },
    "SpiceKing": {
      name: "SpiceKing",
      avatar: "🔥",
      bio: "Professional spice enthusiast and competitive eater. If it's hot, I'll eat it. Sponsored by antacids.",
      joinedDate: "Feb 2024",
      totalRaised: 38920,
      challengesCompleted: 89,
      followers: 23100,
      isLive: false,
      platforms: { twitch: "spicekingofficial", youtube: "spicekingchannel" },
      badges: ["🌶️ Iron Stomach", "💰 Top Earner", "🔥 Heat Seeker"],
      pastChallenges: [
        { title: "Eat Hot Wings Every Hour", outcome: "✅ Completed", raised: 4560, date: "1 day ago" },
        { title: "Carolina Reaper Challenge", outcome: "✅ Completed", raised: 5670, date: "5 days ago" },
        { title: "100 Nugget Speed Run", outcome: "✅ Completed", raised: 3280, date: "1 week ago" }
      ]
    },
    "FlipMaster": {
      name: "FlipMaster",
      avatar: "🤸",
      bio: "Professional acrobat teaching the world to flip! Every challenge is a chance to defy gravity.",
      joinedDate: "Mar 2024",
      totalRaised: 22340,
      challengesCompleted: 64,
      followers: 8750,
      isLive: true,
      currentChallenge: "Learn Double Backflip in 24 Hours",
      platforms: { twitch: "flipmasterTV", youtube: "flipmastergym" },
      badges: ["🤸 Acrobat Master", "⚡ Quick Learner", "📚 Teacher"],
      pastChallenges: [
        { title: "Learn a Backflip in One Day", outcome: "✅ Completed", raised: 1890, date: "3 days ago" },
        { title: "Handstand Marathon", outcome: "✅ Completed", raised: 2340, date: "1 week ago" },
        { title: "Parkour Course Blindfolded", outcome: "❌ Failed", raised: 1120, date: "2 weeks ago" }
      ]
    },
    "MarathonMike": {
      name: "MarathonMike",
      avatar: "🏃",
      bio: "Ultra runner and fitness fanatic. Chat controls my workouts - let's see how far we can go!",
      joinedDate: "Jan 2024",
      totalRaised: 31240,
      challengesCompleted: 98,
      followers: 12300,
      isLive: false,
      platforms: { twitch: "marathonmike", youtube: "mikemarathon" },
      badges: ["🏃 Endurance King", "💪 Iron Will", "🎯 Goal Crusher"],
      pastChallenges: [
        { title: "Run 5K Every Time Chat Says Run", outcome: "✅ Completed", raised: 3210, date: "2 days ago" },
        { title: "24 Hour Running Challenge", outcome: "✅ Completed", raised: 8760, date: "1 week ago" }
      ]
    },
    "ArtistAce": {
      name: "ArtistAce",
      avatar: "🎨",
      bio: "Digital artist and speed painter. Creating masterpieces under pressure is my specialty!",
      joinedDate: "Feb 2024",
      totalRaised: 18920,
      challengesCompleted: 73,
      followers: 9870,
      isLive: true,
      currentChallenge: "Paint 100 Portraits in 24 Hours",
      platforms: { twitch: "artistace", youtube: "aceartist" },
      badges: ["🎨 Creative Genius", "⚡ Speed Artist", "🌟 Rising Star"],
      pastChallenges: [
        { title: "Draw 100 Portraits in 24 Hours", outcome: "✅ Completed", raised: 2100, date: "4 days ago" },
        { title: "Paint With Eyes Closed", outcome: "✅ Completed", raised: 1560, date: "1 week ago" }
      ]
    },
    "AdventureMax": {
      name: "AdventureMax",
      avatar: "🏕️",
      bio: "Outdoor survival expert and wilderness adventurer. Nature is my playground!",
      joinedDate: "Mar 2024",
      totalRaised: 27650,
      challengesCompleted: 52,
      followers: 15420,
      isLive: false,
      platforms: { twitch: "adventuremax", youtube: "maxadventures" },
      badges: ["🏕️ Survival Expert", "🌲 Nature Lover", "⛰️ Peak Performer"],
      pastChallenges: [
        { title: "24-Hour Challenge in a Treehouse", outcome: "✅ Completed", raised: 2340, date: "3 days ago" },
        { title: "Solo Survival - 72 Hours", outcome: "✅ Completed", raised: 6540, date: "2 weeks ago" }
      ]
    }
  });

  const [baseVideos] = useState([
    {
      id: 1,
      title: "24-Hour Challenge in a Treehouse",
      creator: "AdventureMax",
      tags: ["outdoor", "endurance"],
      thumbnail: "🏕️",
      views: 15420,
      engagement: 892,
      fundsRaised: 2340,
      dumbsUpsReceived: 15420,
      dumbCoinsReceived: 117,
      isLive: false,
      timeRemaining: null,
      trending: "stable"
    },
    {
      id: 2,
      title: "Eat Hot Wings Every Hour",
      creator: "SpiceKing",
      tags: ["food", "spicy"],
      thumbnail: "🔥",
      views: 23100,
      engagement: 1456,
      fundsRaised: 4560,
      dumbsUpsReceived: 23100,
      dumbCoinsReceived: 228,
      isLive: false,
      timeRemaining: null,
      trending: "hot"
    },
    {
      id: 3,
      title: "Learn a Backflip in One Day",
      creator: "FlipMaster",
      tags: ["athletic", "skill"],
      thumbnail: "🤸",
      views: 8750,
      engagement: 654,
      fundsRaised: 1890,
      dumbsUpsReceived: 8750,
      dumbCoinsReceived: 94,
      isLive: false,
      timeRemaining: null,
      trending: "stable"
    },
    {
      id: 4,
      title: "Beat Dark Souls Blindfolded",
      creator: "GamerGrit",
      tags: ["gaming", "hardcore"],
      thumbnail: "🎮",
      views: 31200,
      engagement: 2103,
      fundsRaised: 6780,
      dumbsUpsReceived: 31200,
      dumbCoinsReceived: 339,
      isLive: false,
      timeRemaining: null,
      trending: "rising"
    },
    {
      id: 5,
      title: "Run 5K Every Time Chat Says Run",
      creator: "MarathonMike",
      tags: ["fitness", "interactive"],
      thumbnail: "🏃",
      views: 12300,
      engagement: 987,
      fundsRaised: 3210,
      dumbsUpsReceived: 12300,
      dumbCoinsReceived: 160,
      isLive: false,
      timeRemaining: null,
      trending: "stable"
    },
    {
      id: 6,
      title: "Draw 100 Portraits in 24 Hours",
      creator: "ArtistAce",
      tags: ["creative", "art"],
      thumbnail: "🎨",
      views: 9870,
      engagement: 743,
      fundsRaised: 2100,
      dumbsUpsReceived: 9870,
      dumbCoinsReceived: 105,
      isLive: false,
      timeRemaining: null,
      trending: "stable"
    },
    // Live challenges
    {
      id: 100,
      title: "Beat Elden Ring Blindfolded - LIVE NOW",
      creator: "GamerGrit",
      tags: ["gaming", "hardcore"],
      thumbnail: "🎮",
      views: 8920,
      engagement: 1234,
      fundsRaised: 4320,
      dumbsUpsReceived: 8920,
      dumbCoinsReceived: 216,
      isLive: true,
      timeRemaining: 14400, // 4 hours in seconds
      trending: "hot"
    },
    {
      id: 101,
      title: "Learn Double Backflip in 24 Hours - LIVE",
      creator: "FlipMaster",
      tags: ["athletic", "skill"],
      thumbnail: "🤸",
      views: 3450,
      engagement: 567,
      fundsRaised: 1240,
      dumbsUpsReceived: 3450,
      dumbCoinsReceived: 62,
      isLive: true,
      timeRemaining: 7200, // 2 hours
      trending: "rising"
    },
    {
      id: 102,
      title: "Paint 100 Portraits Speed Run - LIVE",
      creator: "ArtistAce",
      tags: ["creative", "art"],
      thumbnail: "🎨",
      views: 2180,
      engagement: 423,
      fundsRaised: 890,
      dumbsUpsReceived: 2180,
      dumbCoinsReceived: 44,
      isLive: true,
      timeRemaining: 28800, // 8 hours
      trending: "new"
    }
  ]);

  const [videos, setVideos] = useState([]);
  const [nextVideoId, setNextVideoId] = useState(1000);
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [donationAmount, setDonationAmount] = useState(10);
  const [donationType, setDonationType] = useState('ups');

  const storeItems = [
    { id: 1, name: "25 DumbCoins", price: 5.00, dumbCoins: 25, icon: "🪙" },
    { id: 2, name: "50 DumbCoins", price: 10.00, dumbCoins: 50, icon: "💰", popular: true },
    { id: 3, name: "125 DumbCoins", price: 25.00, dumbCoins: 125, icon: "💎" },
    { id: 4, name: "250 DumbCoins", price: 50.00, dumbCoins: 250, icon: "👑", bestValue: true },
    { id: 5, name: "625 DumbCoins", price: 125.00, dumbCoins: 625, icon: "🏆" },
  ];

  const videoTemplates = {
    gaming: {
      actions: [
        "Beat", "Speedrun", "Stream Until I Complete", "Play Through", "Master", "Destroy", "Conquer", 
        "No-Hit Run", "Defeat", "First Try", "World Record Attempt", "100% Complete", "Glitchless Run",
        "Randomizer Run", "Permadeath Run", "Co-op Chaos", "Backwards Run", "Mod Madness"
      ],
      subjects: [
        // Soulsborne
        "Dark Souls", "Dark Souls 2", "Dark Souls 3", "Elden Ring", "Bloodborne", "Sekiro", "Demon's Souls",
        // Platformers
        "Cuphead", "Celeste", "Hollow Knight", "Super Meat Boy", "Getting Over It", "Jump King", "I Wanna Be The Guy",
        // RPGs
        "Pokemon Nuzlocke", "Skyrim", "Witcher 3", "Final Fantasy", "Persona 5",
        // Action
        "God of War", "Devil May Cry", "Metal Gear Solid", "Resident Evil", "Silent Hill",
        // Nintendo
        "Every Mario Game", "All Zelda Dungeons", "Smash Bros Tournament", "Mario Maker Gauntlet",
        // Survival/Sandbox
        "Minecraft Hardcore", "Terraria", "Subnautica Permadeath", "Don't Starve",
        // Horror
        "Five Nights at Freddy's", "Outlast", "Amnesia", "Phasmophobia",
        // Indie
        "Undertale Genocide", "Binding of Isaac", "Hades", "Dead Cells", "Risk of Rain",
        // Competitive
        "Valorant Ranked", "League Ranked Climb", "Apex Predator Grind", "Overwatch to GM",
        // Retro
        "Mega Man Series", "Ninja Gaiden", "Ghosts 'n Goblins", "Battletoads",
        // Misc
        "Every FromSoft Boss", "Kaizo Mario", "Souls Games Marathon", "Hardest Games Gauntlet"
      ],
      modifiers: [
        "Blindfolded", "With One Hand", "Without Taking Damage", "In One Sitting", 
        "While Answering Chat Questions", "At Max Difficulty", "With Only Starting Gear", 
        "Backwards Controller", "Upside Down", "With Dance Pad", "Voice Commands Only",
        "Never Level Up", "Fists Only", "Randomized Items", "No HUD", "No Deaths",
        "First Person Only", "Drunk", "Sleep Deprived", "With Streamer Trolling",
        "Chat Makes Decisions", "On Piano", "Guitar Hero Controller", "Steering Wheel",
        "Eyes Closed", "No Sound", "Inverted Controls", "Minimum Time", "Pacifist Run"
      ],
      creators: ["GamerGrit", "SpeedrunSam", "ProPlayer", "StreamKing", "HardcoreHank", "NoHitNinja"],
      thumbnail: "🎮"
    },
    fitness: {
      actions: [
        "Do", "Complete", "Attempt", "Survive", "Endure", "Push Through", "Max Out",
        "Rep Out", "Hold", "Smash", "Crush", "Conquer", "Test My Limit"
      ],
      subjects: [
        // Bodyweight
        "100 Pushups", "200 Situps", "300 Squats", "50 Pullups", "1000 Jumping Jacks", 
        "Burpees", "Mountain Climbers", "Plank Challenge", "Wall Sit", "Handstand Hold",
        // Cardio
        "Marathon", "Half Marathon", "5K Run", "10K Run", "Sprint Intervals", "Stairs Challenge",
        "Jump Rope 10000", "Rowing Machine", "Swimming Miles", "Bike Century",
        // Weightlifting
        "Deadlifts", "Bench Press", "Squats", "Overhead Press", "Clean and Jerk",
        "Power Cleans", "Front Squats", "Weighted Pullups", "Farmer's Carry",
        // CrossFit Style
        "Murph Workout", "Fran", "Grace", "Cindy", "AMRAP", "EMOM", "Tabata",
        // Challenges
        "David Goggins Challenge", "Navy SEAL Test", "Iron Man Training", "Spartan Race Prep",
        "Box Jumps", "Kettlebell Swings", "Battle Ropes", "Sled Push", "Tire Flips",
        // Extreme
        "24 Hour Workout", "100 Mile Run", "Swim Across Lake", "Climb Every Stairs",
        // Calisthenics
        "Muscle Ups", "Human Flag", "Pistol Squats", "Dragon Flag", "Planche Hold",
        // Sports
        "Basketball 100 Free Throws", "Soccer Dribbling", "Punch Combos", "Fight Training"
      ],
      modifiers: [
        "Every Hour for 24 Hours", "Until Failure", "Non-Stop", "In One Day", "While Fasting",
        "In 100 Degree Heat", "At 5 AM", "With No Rest", "Wearing Weighted Vest", 
        "In Freezing Cold", "On Empty Stomach", "After No Sleep", "At High Altitude",
        "With Chatters Counting", "Speed Challenge", "Every Donation = 10 Reps",
        "Slow Motion", "With One Arm", "With One Leg", "No Breaks", "Max Weight",
        "Minimum Time", "Perfect Form Only", "Chat Picks Exercises", "Military Style",
        "With a Partner", "Outdoor Only", "In Public", "At the Gym", "At Home"
      ],
      creators: ["FitnessFrenzy", "MarathonMike", "EnduranceElite", "GymGuru", "IronWill", "BeastMode"],
      thumbnail: "💪"
    },
    food: {
      actions: [
        "Eat", "Cook", "Mukbang", "Drink", "Devour", "Try", "Taste Test", "Make From Scratch",
        "Binge", "Sample", "Review", "Rate", "Conquer", "Speed Eat", "Cook Off", "Blindfold Taste"
      ],
      subjects: [
        // Fast Food Challenges
        "Everything at McDonald's", "Entire Taco Bell Menu", "All Burger King Burgers", 
        "Every Subway Sandwich", "KFC Bucket", "Chipotle Build", "Five Guys All Toppings",
        // Quantity Challenges
        "50 Chicken Wings", "100 Nuggets", "10 Pounds of Pasta", "Entire Birthday Cake", 
        "Gallon of Ice Cream", "12 Donuts", "Giant Pizza", "50 Hot Dogs", "100 Tacos",
        // Spicy Challenges
        "World's Hottest Peppers", "Carolina Reaper Challenge", "Spicy Ramen", "Hot Wing Gauntlet",
        "Ghost Pepper Pizza", "Spicy Food Tour", "Every Hot Sauce", "Flaming Hot Challenge",
        // International Cuisine
        "Korean BBQ Feast", "Sushi Boat", "Indian Curry Levels", "Thai Street Food",
        "Japanese Ramen Tour", "Mexican Street Tacos", "Italian Pasta", "Greek Mezze",
        "Chinese Dim Sum", "Vietnamese Pho", "Ethiopian Injera", "Jamaican Jerk",
        // Weird/Unusual
        "Gas Station Food Only", "Mystery Box Ingredients", "Backwards Recipe", 
        "Only One Color Foods", "Airport Food Challenge", "Vending Machine Meals",
        "Food from Every State", "Extinct Fast Food Items", "Foreign Candy Taste Test",
        // Cooking Challenges
        "5 Course Meal", "Thanksgiving Feast", "BBQ Brisket", "Homemade Sushi",
        "From Scratch Pasta", "Perfect Steak", "Sourdough Bread", "Croissants",
        // Drink Challenges
        "Every Coffee Drink", "Soda Taste Test", "Energy Drink Ranking", "Smoothie Challenge",
        // Competitive
        "Food Eating Contest", "Cooking Competition", "Bake Off", "Speed Eating",
        // Themed
        "Medieval Feast", "90s Snacks", "Childhood Favorites", "Viral TikTok Foods",
        "Prison Food", "Hospital Food", "School Lunch Nostalgia", "Weird Chip Flavors"
      ],
      modifiers: [
        "In One Sitting", "While Streaming", "Speed Eating", "ASMR Style", "Blindfolded",
        "With Hot Sauce on Everything", "In 10 Minutes", "Rating Every Bite", "With My Eyes Closed",
        "Chat Picks Everything", "Until I'm Full", "Competitively", "While Dancing",
        "One Hand Only", "With Chopsticks Only", "No Utensils", "In Fancy Restaurant",
        "At 3 AM", "Backwards", "In Alphabetical Order", "Smallest to Largest",
        "With Gross Combinations", "Mystery Ingredients", "Budget Challenge $5",
        "Luxury Version", "Vegan Version", "Keto Version", "Without Recipe"
      ],
      creators: ["SpiceKing", "ChefChaos", "FoodieFreak", "MukbangMaster", "EatingChamp", "FlavorFiend"],
      thumbnail: "🍔"
    },
    creative: {
      actions: [
        "Create", "Build", "Draw", "Design", "Make", "Craft", "Paint", "Sculpt",
        "Illustrate", "Animate", "Render", "Model", "Sketch", "Compose", "Produce", "Edit"
      ],
      subjects: [
        // Art
        "100 Drawings", "Portrait Series", "Landscape Paintings", "Abstract Art", 
        "Digital Painting", "Oil Painting", "Watercolor", "Spray Paint Mural",
        "Pixel Art", "Comic Book", "Manga Chapter", "Graphic Novel",
        // 3D/Digital
        "3D Model", "3D Character", "Game Asset Pack", "Environment Design",
        "Product Render", "Architecture Visualization", "Blender Tutorial",
        // Animation
        "Short Animation", "Stop Motion Film", "2D Animation", "Motion Graphics",
        "Character Walk Cycle", "Logo Animation", "Music Video", "Explainer Video",
        // Music Production
        "Full Album", "Beat Tape", "Remix", "Cover Song", "Original Song",
        "Sound Design", "Podcast Episode", "Audio Drama", "Lo-Fi Hip Hop",
        // Video/Film
        "Short Film", "Documentary", "Music Video", "Vlog Edit", "Movie Trailer",
        "Commercial", "Skateboard Video", "Travel Film", "Wedding Video",
        // Photography
        "Photo Series", "Portrait Session", "Product Photography", "Street Photography",
        "Landscape Photos", "Time Lapse", "Long Exposure", "Photo Manipulation",
        // Craft/Physical
        "Sculpture Garden", "Clay Sculpture", "Wood Carving", "Metal Work",
        "Costume Design", "Full Cosplay", "Prop Replica", "Miniature Diorama",
        // Writing
        "Short Story", "Poem Collection", "Screenplay", "Song Lyrics", "Novel Chapter",
        // Design
        "Logo Design", "Website Design", "App UI/UX", "Poster Series", "Brand Identity",
        "T-Shirt Designs", "Album Cover", "Book Cover", "Infographic",
        // Game Dev
        "Entire Game", "Game Level", "Game Character", "Game Mechanic", "Indie Game Prototype",
        // Misc
        "Tattoo Flash", "Graffiti Piece", "Fashion Outfit", "Jewelry Piece", "Origami"
      ],
      modifiers: [
        "In 24 Hours", "In 1 Hour", "In 10 Minutes", "From Trash", "With One Color", 
        "Without Planning", "Using Only Paint", "Chat Controls It", "With My Eyes Closed",
        "In Public", "From Memory", "No References", "Left Hand Only", "While Moving",
        "Upside Down", "In MS Paint", "On Phone Only", "No Undo", "First Try",
        "With Random Tools", "Minimalist Style", "Maximum Detail", "Chat Votes Style",
        "Copying Master", "Without Erasing", "Speed Run", "Worst Tools Possible",
        "Medieval Style", "Futuristic Style", "Retro Style", "Children's Book Style"
      ],
      creators: ["ArtistAce", "CreativeCrafter", "DevDynamo", "MakerMind", "DesignDiva", "CraftKing"],
      thumbnail: "🎨"
    },
    outdoor: {
      actions: [
        "Camp", "Hike", "Survive", "Explore", "Adventure", "Trek", "Climb",
        "Summit", "Backpack", "Traverse", "Kayak", "Raft", "Mountain Bike", "Trail Run"
      ],
      subjects: [
        // Locations
        "Random Location", "Mountain Peak", "Desert", "Forest", "Beach", "Cave", 
        "Glacier", "Jungle", "Island", "Canyon", "Swamp", "Tundra", "Volcano",
        "National Park", "Abandoned Place", "Ghost Town", "Remote Village",
        // Activities
        "14er Peak", "Thru-Hike", "PCT Section", "AT Section", "Ultralight Trek",
        "Wild River", "Rock Face", "Ice Climbing", "Bouldering", "Via Ferrata",
        "Whitewater Rapid", "Ocean Kayak", "Sea Cave", "Reef Diving", "Shipwreck",
        "Wild Camping", "Stealth Camp", "Hammock Camp", "Snow Cave", "Shelter Build",
        // Survival
        "Primitive Survival", "Bushcraft Build", "Fire by Friction", "Water Purification",
        "Wild Foraging", "Fishing Challenge", "Trap Building", "Shelter Making",
        // Extreme
        "Everest Base Camp", "Kilimanjaro Summit", "Patagonia Trek", "Amazon Jungle",
        "Arctic Circle", "Death Valley", "Sahara Desert", "Australian Outback",
        // Unique
        "Urban Exploration", "Roof Topping", "Storm Chasing", "Aurora Hunting",
        "Wildlife Photography", "Bird Watching Marathon", "Star Gazing Night"
      ],
      modifiers: [
        "For 72 Hours", "For 24 Hours", "Solo", "With Minimal Supplies", "In Winter",
        "Without Technology", "Off Grid", "In a Storm", "At Night Only", "Without Fire",
        "No Tent", "Barefoot", "Primitive Tools Only", "No Food", "Only What I Find",
        "In Extreme Heat", "In Freezing Cold", "During Monsoon", "Under Full Moon",
        "Sunrise to Sunset", "Non-Stop", "First Time Ever", "Blindfolded Navigation",
        "No Map", "Following River", "Peak Bagging", "Speed Record", "Ultra Light",
        "Heavy Pack", "With Injury", "Documentary Style", "Silent Vlog", "Time Lapse"
      ],
      creators: ["AdventureMax", "WildernessWill", "SurvivalSara", "TrailBlazer", "NatureNomad"],
      thumbnail: "🏕️"
    },
    music: {
      actions: [
        "Learn", "Master", "Cover", "Perform", "Create", "Compose", "Produce",
        "Record", "Mix", "Remix", "Improvise", "Jam", "Freestyle", "Arrange", "Transcribe"
      ],
      subjects: [
        // Learning
        "New Instrument", "Guitar", "Piano", "Drums", "Bass", "Violin", "Saxophone",
        "Flute", "Trumpet", "Ukulele", "Harmonica", "Accordion",
        // Performance
        "10 Songs", "Full Concert", "Street Performance", "Open Mic Set", "Karaoke Night",
        "Classical Piece", "Jazz Standard", "Blues Progression", "Metal Shred",
        // Production
        "Viral Beat", "Lo-Fi Track", "Trap Beat", "House Track", "Dubstep Drop",
        "Orchestra Piece", "Rap Battle", "Entire Album", "EP", "Single Release",
        // Covers
        "100 Song Medley", "Every Beatles Song", "Taylor Swift Discography",
        "Movie Soundtracks", "Anime Openings", "Video Game Music", "Meme Songs",
        // Genres
        "Country Song", "Rock Anthem", "Hip Hop Track", "EDM Banger", "Folk Song",
        "Reggae Jam", "Punk Song", "Soul Track", "Gospel Song", "Metal Song",
        // Specific
        "Guitar Solo", "Drum Solo", "Piano Sonata", "String Quartet", "Acapella",
        "Beat Boxing", "Fingerstyle Guitar", "Shred Session", "Jazz Improv",
        // Production Specific
        "From Scratch DAW", "Using Only Samples", "One Take Recording", "Field Recording Track"
      ],
      modifiers: [
        "In One Day", "In One Hour", "From Scratch", "Blindfolded", "Using Only Samples",
        "Live on Stream", "Without Sheet Music", "By Ear", "In One Take", "No Editing",
        "With One Hand", "On Toy Instrument", "Acoustic Only", "Electronic Only",
        "Chat Picks Chords", "Random Key", "Wrong Instrument", "Backwards",
        "At 3 AM", "In Public", "Street Performance", "With Stranger", "In Studio",
        "Lo-Fi Quality", "Professional Quality", "Underwater", "In Echo Chamber",
        "With Distortion", "Unplugged", "Full Band", "Solo Performance", "Duet"
      ],
      creators: ["MusicMinute", "MusicalMayhem", "BeatMaster", "SongSmith", "MelodyMaker"],
      thumbnail: "🎵"
    },
    athletic: {
      actions: [
        "Learn", "Master", "Attempt", "Perfect", "Complete", "Nail", "Land",
        "Execute", "Practice", "Train", "Drill", "Pull Off", "Stick"
      ],
      subjects: [
        // Gymnastics
        "Backflip", "Front Flip", "Double Backflip", "Triple Backflip", "Side Flip",
        "Aerial", "Webster", "Gainer", "Cork", "Full Twist", "Double Full",
        "Every Gymnastics Move", "Floor Routine", "Parallel Bars", "Rings Routine",
        // Parkour
        "Parkour Course", "Roof Gap", "Precision Jump", "Wall Run", "Cat Leap",
        "Kong Vault", "Speed Vault", "Lazy Vault", "Urban Course", "Parkour Flow",
        // Skateboarding
        "Skateboard Tricks", "Kickflip", "Heelflip", "360 Flip", "Impossible",
        "Every Flat Ground Trick", "Skatepark Line", "Bowl Riding", "Vert Ramp",
        // Martial Arts
        "Flying Kick", "Spinning Hook Kick", "Board Breaking", "Fight Combo",
        "Kata Performance", "Sparring Match", "Weapons Form",
        // Strength
        "Handstand Walk", "Handstand Pushups", "One Arm Pullup", "Muscle Up",
        "Human Flag", "Front Lever", "Back Lever", "Planche", "Iron Cross",
        // Flexibility
        "Full Split", "Middle Split", "Front Split", "Bridge", "Needle", "Oversplit",
        // Dance
        "Dance Routine", "Breakdance", "Hip Hop Choreo", "Contemporary Piece",
        // Extreme Sports
        "BMX Trick", "Scooter Trick", "Roller Blade", "Mountain Bike Jump",
        "Surfing", "Snowboarding Trick", "Ski Jump", "Wakeboarding",
        // Ball Sports
        "Trick Shot", "Basketball Dunk", "Soccer Freestyle", "Ultimate Frisbee Catch",
        // Misc
        "Cartwheel Variations", "Round Off", "Butterfly Kick", "Tornado Kick",
        "Capoeira Move", "Trampoline Combo", "Diving Board Flip", "Rope Swing Flip"
      ],
      modifiers: [
        "In 24 Hours", "In One Day", "In One Hour", "On First Try", "Until Success",
        "Without Help", "Increasing Difficulty", "With Explanation", "In Slow Motion",
        "Teaching Others", "Progressive Drills", "Perfect Form", "100 Times",
        "Both Sides", "Switch Stance", "On Trampoline", "Into Foam Pit", "Into Pool",
        "On Grass", "On Concrete", "In Gym", "In Public", "At Park", "At Beach",
        "Blindfolded", "With Weights", "After Running", "When Tired", "At Night",
        "Competition Style", "Tutorial Format", "Motivation Speech", "Training Montage"
      ],
      creators: ["FlipMaster", "AthleticAce", "ParkourPro", "TrickTutor", "MoveMaster"],
      thumbnail: "🤸"
    },
    challenge: {
      actions: [
        "Try", "Survive", "Complete", "Endure", "Last Through", "Win", "Conquer",
        "Attempt", "Take On", "Face", "Battle", "Test", "Prove"
      ],
      subjects: [
        // Social
        "Silent Challenge", "No Phone Challenge", "Yes Man Challenge", "Opposite Day",
        "Compliment Strangers", "Random Acts of Kindness", "Talk to 100 People",
        "Make 10 Friends", "No Lying Challenge", "Only Truth Challenge",
        // Restriction
        "No Sleep 24 Hours", "No Food 48 Hours", "No Water Challenge", "No Sitting",
        "No Internet Week", "No Social Media Month", "Only $1 Per Day",
        "Living in Car", "Homeless Challenge", "Minimum Wage Week",
        // Endurance
        "24hr Handcuff to Friend", "48 Hour Stream", "72 Hour Gaming", "Week in Woods",
        "30 Day Challenge", "Standing Challenge", "Staying Awake Marathon",
        // Weird/Funny
        "Everything Chat Says", "Truth or Dare Extreme", "Mystery Box Challenge",
        "Switch Lives", "Impersonate Challenge", "Accent Challenge All Day",
        "Whisper Challenge", "Baby Food Challenge", "Not My Arms Challenge",
        // Prank/Social
        "Public Singing", "Flash Mob", "Invisible Box Challenge", "Mannequin Challenge",
        "Random Dance in Public", "Compliment Spree", "Free Hugs", "Smile Challenge",
        // Skill
        "Learn TikTok Dances", "Every Viral Challenge", "Bottle Flip 1000x",
        "Cup Song Marathon", "Card Trick Master", "Magic Routine",
        // Living
        "Living Like Millionaire", "Living Like Homeless", "Living Like Celeb",
        "Medieval Life Day", "Stone Age Weekend", "Future Tech Only",
        // Food Related
        "Drive Thru Backwards Order", "Ordering in Different Language", "Last Item Challenge",
        // Extreme
        "Polar Plunge", "Ice Bath Hour", "Sauna Challenge", "Cold Shower Week",
        "Hot Pepper Daily", "Eat Only One Food Week",
        // Chaos
        "Chat Controls My Life", "Do Whatever Reddit Says", "Twitter Tells Me What to Do",
        "Following GPS Blindly", "Random Uber Destination", "Random Flight Challenge",
        // Games/Competition  
        "Rock Paper Scissors Tournament", "Staring Contest", "Don't Laugh Challenge",
        "Try Not To Cringe", "Quiz Show Gauntlet", "Trivia Marathon"
      ],
      modifiers: [
        "For 48 Hours", "For 24 Hours", "For One Week", "In Public", "With Strangers",
        "Extreme Version", "Chat Controls", "Until I Fail", "With Consequences",
        "In a Foreign Country", "At 3 AM", "Blindfolded", "Without Preparation",
        "With Best Friend", "With Rival", "Solo", "In Group", "Competition Style",
        "For Charity", "With Donations", "Subscribers Choose", "Viewer Punishment",
        "High Stakes", "No Backing Out", "All or Nothing", "Live Stream Only",
        "Vlog Style", "Documentary Format", "Reality Show Style", "Hidden Camera"
      ],
      creators: ["ChallengeMaster", "DareDevil", "CrazyCarl", "RiskyRick", "ExtremeLiving"],
      thumbnail: "🎯"
    },
    skill: {
      actions: [
        "Master", "Learn", "Perfect", "Develop", "Practice", "Speedrun Learning",
        "Tutorial", "Teach Myself", "Study", "Train", "Drill", "Memorize"
      ],
      subjects: [
        // Magic/Performance
        "Juggling", "Card Tricks", "Coin Magic", "Sleight of Hand", "Magic Routine",
        "Stage Magic", "Close Up Magic", "Mentalism", "Escape Artist",
        // Mental
        "Speed Reading", "Memory Palace", "Memorize Deck of Cards", "Pi Digits",
        "Learn Language Basics", "Mental Math", "Chess Opening", "Poker Tells",
        // Physical Skill
        "Typing Speed 100 WPM", "Rubiks Cube Sub-20", "Speed Stacking", "Pen Spinning",
        "Yo-Yo Tricks", "Kendama Tricks", "Butterfly Knife", "Zippo Tricks",
        // Practical
        "Lockpicking", "Knot Tying", "Origami", "Calligraphy", "Sign Language Basics",
        "Morse Code", "Touch Typing", "Speed Cubing", "Solving Puzzle Cube Variations",
        // Art Skills
        "Drawing Hands", "Perspective Drawing", "Portrait Drawing", "Caricatures",
        "Lettering", "Watercolor Technique", "Digital Art Basics",
        // Performance
        "Stand Up Comedy Set", "Improv Skills", "Voice Acting", "Accents",
        "Beatboxing", "Whistling", "Throat Singing",
        // Games/Puzzles
        "Chess Tactics", "Poker Strategy", "Sudoku Speed", "Crossword Expert",
        "Wordle Strategy", "Minesweeper Expert", "Solitaire Speedrun",
        // Tech
        "Excel Mastery", "Photoshop Basics", "Video Editing", "Touch Typing",
        "Keyboard Shortcuts", "Vim Commands", "Terminal Basics",
        // Unique
        "Moonwalk", "Robot Dance", "Wave Dance", "Tutting", "Popping",
        "Contact Juggling", "Staff Spinning", "Poi Spinning", "Devil Sticks",
        "Cup Stacking", "Card Throwing", "Boomerang", "Frisbee Tricks",
        // Academic
        "Programming Language", "Music Theory", "Math Concept", "Science Experiment",
        "Philosophy Basics", "Psychology Tricks", "Debate Tactics"
      ],
      modifiers: [
        "In One Week", "In One Day", "In One Hour", "From Zero", "To Expert Level",
        "Step by Step", "With Science", "Until Perfect", "Explaining Every Step",
        "Teaching Others", "Tutorial Style", "No Prior Experience", "Complete Beginner",
        "Advanced Techniques", "Professional Level", "Competition Ready",
        "Blindfolded", "With One Hand", "Speed Challenge", "Accuracy Challenge",
        "Under Pressure", "With Distraction", "In Public", "While Streaming",
        "No Mistakes", "First Try", "Progressive Difficulty", "From Books Only",
        "No YouTube Help", "Trial and Error Only", "Self Taught", "Mentor Guided"
      ],
      creators: ["SkillSeeker", "QuickLearn", "TalentTutor", "ProPractice", "MasterMind"],
      thumbnail: "⚡"
    },
    coding: {
      actions: [
        "Build", "Code", "Create", "Program", "Develop", "Hack Together", "Engineer",
        "Design", "Implement", "Deploy", "Debug", "Refactor", "Optimize", "Ship"
      ],
      subjects: [
        // Web
        "Full Website", "Landing Page", "E-Commerce Site", "Social Media Clone",
        "Portfolio Site", "Blog Platform", "Forum", "Wiki", "Dashboard",
        // Apps
        "Mobile App", "iOS App", "Android App", "React Native App", "Flutter App",
        "Todo App", "Weather App", "Chat App", "Notes App", "Calculator App",
        // Games
        "3D Game", "2D Platformer", "Puzzle Game", "Card Game", "Fighting Game",
        "Racing Game", "RPG", "Roguelike", "Idle Game", "Clicker Game",
        // AI/ML
        "AI Bot", "Chat Bot", "Discord Bot", "Twitter Bot", "AI Image Generator",
        "Neural Network", "Machine Learning Model", "AI Assistant", "Recommendation System",
        // Tools
        "Chrome Extension", "VS Code Extension", "CLI Tool", "Desktop App",
        "Automation Script", "Web Scraper", "Data Visualizer", "API Wrapper",
        // Backend
        "REST API", "GraphQL API", "Microservice", "Database Schema", "Authentication System",
        "Payment Integration", "Real-Time Chat", "WebSocket Server",
        // Low Level
        "Operating System", "Compiler", "Interpreter", "Assembler", "Emulator",
        "Programming Language", "Virtual Machine", "Bootloader", "Kernel Module",
        // Algorithms
        "Sorting Algorithm", "Pathfinding AI", "Search Engine", "Compression Algorithm",
        "Encryption System", "Hash Function", "Data Structure",
        // Graphics
        "Raytracer", "Game Engine", "Physics Engine", "3D Renderer", "Shader",
        // Blockchain
        "Smart Contract", "NFT Project", "Crypto Bot", "Blockchain Explorer",
        // Misc
        "Code Editor", "Git Client", "Package Manager", "Build Tool", "Testing Framework",
        "Documentation Generator", "Code Formatter", "Linter", "Monitoring Tool"
      ],
      modifiers: [
        "In 48 Hours", "In 24 Hours", "In 12 Hours", "Live on Stream", "From Scratch",
        "Without Tutorials", "Without Stack Overflow", "Using Only AI", "With AI Pair Programming",
        "While Explaining", "Teaching Style", "In Assembly", "With No Libraries",
        "Vanilla JavaScript Only", "No Frameworks", "Bare Bones", "Minimal Code",
        "Without IDE", "In Vim", "In Notepad", "Mobile Device Only",
        "Without Mouse", "Voice Coding Only", "Pair Programming", "Mob Programming",
        "TDD Style", "No Testing", "Production Ready", "MVP Speed", "Hackathon Style",
        "Clean Code", "Code Golf", "Fewest Lines", "Most Efficient",
        "Different Language", "Unfamiliar Stack", "Legacy Codebase", "Spaghetti Code",
        "Drunk", "Sleep Deprived", "With Chat Commands", "Twitch Plays", "Random API",
        "No Planning", "Agile Sprint", "Waterfall", "Documentation First"
      ],
      creators: ["DevDynamo", "CodeCrusader", "TechTitan", "ProgramPro", "HackerHero"],
      thumbnail: "💻"
    }
  };

  // Simulate live viewer counts
  useEffect(() => {
    const interval = setInterval(() => {
      setVideos(prev => prev.map(video => {
        if (video.isLive) {
          // Randomly update live stats
          const viewChange = Math.floor(Math.random() * 100) - 30;
          const engagementChange = Math.floor(Math.random() * 20) - 5;
          const fundsChange = (Math.random() * 50);
          
          return {
            ...video,
            views: Math.max(0, video.views + viewChange),
            engagement: Math.max(0, video.engagement + engagementChange),
            fundsRaised: video.fundsRaised + fundsChange,
            timeRemaining: video.timeRemaining ? Math.max(0, video.timeRemaining - 5) : null
          };
        }
        return video;
      }));

      // Simulate random donation notification
      if (Math.random() > 0.7) {
        const liveVideos = videos.filter(v => v.isLive);
        if (liveVideos.length > 0) {
          const randomVideo = liveVideos[Math.floor(Math.random() * liveVideos.length)];
          const amounts = [10, 25, 50, 100, 250, 500];
          const amount = amounts[Math.floor(Math.random() * amounts.length)];
          const types = ['DumbsUps', 'DumbCoins'];
          const type = types[Math.floor(Math.random() * types.length)];
          
          setRecentDonation({
            creator: randomVideo.creator,
            amount,
            type,
            timestamp: Date.now()
          });
          
          setTimeout(() => setRecentDonation(null), 5000);
        }
      }
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [videos]);

  // Timer for watch time tracking
  useEffect(() => {
    const timer = setInterval(() => {
      setWatchTime(prev => prev + 1);
      
      if (watchTime > 0 && watchTime % 10 === 0) {
        earnDumbsUps(1, 'Watch time reward');
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [currentVideoIndex, watchTime]);

  // Initialize
  useEffect(() => {
    const storedUser = { id: 'user_001', name: 'Demo User' };
    setCurrentUser(storedUser);
    setVideos([...baseVideos]);
    console.log('🎬 Initialized with', baseVideos.length, 'base videos');
  }, []);

  // Check onboarding and generate videos
  useEffect(() => {
    const totalEngagements = userEngagement.likes.length + 
                            userEngagement.skips.length + 
                            userEngagement.notInterested.length;
    
    if (totalEngagements >= 10 && !hasCompletedOnboarding) {
      console.log('🎉 ONBOARDING COMPLETED!');
      setHasCompletedOnboarding(true);
      earnDumbsUps(50, 'Onboarding bonus!');
      
      setGenerationNotification('🎉 Generating 10 personalized videos!');
      setTimeout(() => setGenerationNotification(''), 3000);
      
      const newVideos = [];
      const tagWeights = userEngagement.tagWeights;
      
      for (let i = 0; i < 10; i++) {
        const video = generateSingleVideo(tagWeights, nextVideoId + i);
        newVideos.push(video);
      }
      
      console.log('✅ Generated:', newVideos.map(v => v.title));
      setVideos(prev => [...prev, ...newVideos]);
      setNextVideoId(prev => prev + 10);
    }
  }, [userEngagement.likes.length, userEngagement.skips.length, userEngagement.notInterested.length]);

  // Filter and sort feed when preferences change
  useEffect(() => {
    if (hasCompletedOnboarding && Object.keys(userEngagement.tagWeights).length > 0) {
      console.log('🔄 Rebuilding feed with tag weights:', userEngagement.tagWeights);
      
      const filtered = videos.filter(video => {
        const hasDisliked = video.tags.some(tag => {
          const weight = userEngagement.tagWeights[tag] || 0;
          return weight < -0.5;
        });
        if (hasDisliked) {
          console.log('❌ Filtered:', video.title);
        }
        return !hasDisliked;
      });
      
      const scored = filtered.map(video => ({
        ...video,
        score: calculateVideoScore(video)
      }));
      
      const sorted = scored.sort((a, b) => b.score - a.score);
      
      console.log('✅ Top 3:', sorted.slice(0, 3).map(v => `${v.title} (${v.score.toFixed(2)})`));
      setVideos(sorted);
      
      if (currentVideoIndex >= sorted.length) {
        setCurrentVideoIndex(0);
      }
    }
  }, [userEngagement.tagWeights, hasCompletedOnboarding]);

  const generateSingleVideo = (tagWeights, id) => {
    let selectedCategory;
    const positiveWeights = Object.entries(tagWeights)
      .filter(([tag, weight]) => weight > 0)
      .sort((a, b) => b[1] - a[1]);
    
    if (positiveWeights.length > 0) {
      const weightedCategories = [];
      positiveWeights.forEach(([tag, weight]) => {
        if (videoTemplates[tag]) {
          const multiplier = Math.max(1, Math.floor(weight * 5));
          for (let j = 0; j < multiplier; j++) {
            weightedCategories.push(tag);
          }
        }
      });
      
      selectedCategory = weightedCategories.length > 0
        ? weightedCategories[Math.floor(Math.random() * weightedCategories.length)]
        : Object.keys(videoTemplates)[0];
    } else {
      const categories = Object.keys(videoTemplates);
      selectedCategory = categories[Math.floor(Math.random() * categories.length)];
    }
    
    if (!videoTemplates[selectedCategory]) {
      selectedCategory = Object.keys(videoTemplates)[0];
    }
    
    const template = videoTemplates[selectedCategory];
    const action = template.actions[Math.floor(Math.random() * template.actions.length)];
    const subject = template.subjects[Math.floor(Math.random() * template.subjects.length)];
    const modifier = template.modifiers[Math.floor(Math.random() * template.modifiers.length)];
    const creator = template.creators[Math.floor(Math.random() * template.creators.length)];
    
    const trends = ['stable', 'rising', 'hot', 'new'];
    
    return {
      id,
      title: `${action} ${subject} ${modifier}`,
      creator,
      tags: [selectedCategory, "challenge"],
      thumbnail: template.thumbnail,
      views: Math.floor(Math.random() * 40000) + 5000,
      engagement: Math.floor(Math.random() * 3000) + 500,
      fundsRaised: Math.floor(Math.random() * 5000) + 500,
      dumbsUpsReceived: Math.floor(Math.random() * 10000),
      dumbCoinsReceived: Math.floor(Math.random() * 200),
      isLive: false,
      timeRemaining: null,
      trending: trends[Math.floor(Math.random() * trends.length)],
      generated: true
    };
  };

  const calculateVideoScore = (video) => {
    let score = video.engagement / video.views;
    
    if (userEngagement.following.includes(video.creator)) {
      score += 1.0;
    }
    
    video.tags.forEach(tag => {
      const weight = userEngagement.tagWeights[tag] || 0;
      if (weight > 0) {
        score += weight * 1.0;
      } else if (weight < 0) {
        score -= Math.abs(weight) * 2.0;
      }
    });

    const hasStronglyDislikedTag = video.tags.some(tag => {
      const weight = userEngagement.tagWeights[tag] || 0;
      return weight <= -2.0;
    });
    
    if (hasStronglyDislikedTag) {
      score -= 100;
    }

    return score;
  };

  const earnDumbsUps = (amount, reason) => {
    setDumbsUps(prev => prev + amount);
    setTotalEarned(prev => prev + amount);
    console.log(`💰 +${amount} DumbsUps: ${reason}`);
  };

  const purchaseDumbCoins = (amount, price) => {
    setDumbCoins(prev => prev + amount);
    setTotalPurchased(prev => prev + amount);
    alert(`✅ Successfully purchased ${amount} DumbCoins for $${price.toFixed(2)}!`);
  };

  const handleLike = () => {
    const video = videos[currentVideoIndex];
    console.log(`❤️ LIKED: ${video.title} (tags: ${video.tags.join(', ')})`);
    
    setUserEngagement(prev => {
      const newEngagement = {
        ...prev,
        likes: [...prev.likes, video.id],
        watchTimes: { ...prev.watchTimes, [video.id]: watchTime },
        tagWeights: { ...prev.tagWeights }
      };

      video.tags.forEach(tag => {
        const oldWeight = newEngagement.tagWeights[tag] || 0;
        newEngagement.tagWeights[tag] = oldWeight + 1;
        console.log(`  Tag '${tag}': ${oldWeight} → ${oldWeight + 1}`);
      });

      return newEngagement;
    });

    earnDumbsUps(5, 'Liked a video');
    nextVideo();
  };

  const handleSkip = () => {
    const video = videos[currentVideoIndex];
    console.log(`⏭️ SKIPPED: ${video.title} (tags: ${video.tags.join(', ')}) - ${watchTime}s`);
    
    setUserEngagement(prev => {
      const newEngagement = {
        ...prev,
        skips: [...prev.skips, video.id],
        watchTimes: { ...prev.watchTimes, [video.id]: watchTime },
        tagWeights: { ...prev.tagWeights }
      };

      if (watchTime < 5) {
        video.tags.forEach(tag => {
          const oldWeight = newEngagement.tagWeights[tag] || 0;
          newEngagement.tagWeights[tag] = oldWeight - 0.5;
          console.log(`  Tag '${tag}': ${oldWeight} → ${oldWeight - 0.5}`);
        });
      }

      return newEngagement;
    });

    earnDumbsUps(1, 'Engagement reward');
    nextVideo();
  };

  const handleNotInterested = () => {
    const video = videos[currentVideoIndex];
    console.log(`👎 NOT INTERESTED: ${video.title} (tags: ${video.tags.join(', ')})`);
    
    setUserEngagement(prev => {
      const newEngagement = {
        ...prev,
        notInterested: [...prev.notInterested, video.id],
        watchTimes: { ...prev.watchTimes, [video.id]: watchTime },
        tagWeights: { ...prev.tagWeights }
      };

      video.tags.forEach(tag => {
        const oldWeight = newEngagement.tagWeights[tag] || 0;
        newEngagement.tagWeights[tag] = oldWeight - 2;
        console.log(`  Tag '${tag}': ${oldWeight} → ${oldWeight - 2} (HEAVY PENALTY)`);
      });

      return newEngagement;
    });

    nextVideo();
  };

  const handleFollow = () => {
    const video = videos[currentVideoIndex];
    
    setUserEngagement(prev => {
      if (prev.following.includes(video.creator)) {
        return prev;
      }

      console.log(`👤 FOLLOWED: ${video.creator}`);
      earnDumbsUps(10, `Followed ${video.creator}`);
      return {
        ...prev,
        following: [...prev.following, video.creator]
      };
    });
  };

  const handleDonate = (amount, type) => {
    const video = videos[currentVideoIndex];
    
    if (type === 'ups') {
      if (dumbsUps >= amount) {
        setDumbsUps(prev => prev - amount);
        setTotalDonatedUps(prev => prev + amount);
        
        setUserEngagement(prev => ({
          ...prev,
          donationsUps: {
            ...prev.donationsUps,
            [video.creator]: (prev.donationsUps[video.creator] || 0) + amount
          }
        }));
        
        const updatedVideos = videos.map(v => 
          v.id === video.id 
            ? { ...v, dumbsUpsReceived: (v.dumbsUpsReceived || 0) + amount }
            : v
        );
        setVideos(updatedVideos);
        
        setShowDonationModal(false);
        alert(`✅ Sent ${amount} DumbsUps to ${video.creator}!`);
      } else {
        alert('❌ Not enough DumbsUps!');
      }
    } else if (type === 'coins') {
      if (dumbCoins >= amount) {
        setDumbCoins(prev => prev - amount);
        setTotalDonatedCoins(prev => prev + amount);
        
        setUserEngagement(prev => ({
          ...prev,
          donationsCoins: {
            ...prev.donationsCoins,
            [video.creator]: (prev.donationsCoins[video.creator] || 0) + amount
          }
        }));
        
        const dollarValue = amount / 5;
        const updatedVideos = videos.map(v => 
          v.id === video.id 
            ? { 
                ...v, 
                dumbCoinsReceived: (v.dumbCoinsReceived || 0) + amount,
                fundsRaised: v.fundsRaised + dollarValue 
              }
            : v
        );
        setVideos(updatedVideos);
        
        setShowDonationModal(false);
        alert(`✅ Donated ${amount} DumbCoins ($${dollarValue.toFixed(2)}) to ${video.creator}!`);
      } else {
        alert('❌ Not enough DumbCoins!');
      }
    }
  };

  const nextVideo = () => {
    setWatchTime(0);
    const nextIndex = currentVideoIndex + 1;
    
    console.log(`➡️ Next: ${nextIndex}/${videos.length}`);
    
    if (hasCompletedOnboarding && nextIndex >= videos.length - 5) {
      console.log('🤖 Generating 5 more videos...');
      setGenerationNotification(`🤖 Generating 5 more! (${videos.length} → ${videos.length + 5})`);
      setTimeout(() => setGenerationNotification(''), 3000);
      
      const newVideos = [];
      for (let i = 0; i < 5; i++) {
        newVideos.push(generateSingleVideo(userEngagement.tagWeights, nextVideoId + i));
      }
      
      console.log('✅ New:', newVideos.map(v => v.title));
      setVideos(prev => [...prev, ...newVideos]);
      setNextVideoId(prev => prev + 5);
    }
    
    if (nextIndex < videos.length) {
      setCurrentVideoIndex(nextIndex);
    }
  };

  const formatTime = (seconds) => {
    if (!seconds) return 'N/A';
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  const getTrendingIcon = (trending) => {
    switch(trending) {
      case 'hot': return <Flame className="text-orange-500" size={16} />;
      case 'rising': return <TrendingUp className="text-green-500" size={16} />;
      case 'new': return <Zap className="text-yellow-500" size={16} />;
      default: return null;
    }
  };

  const getTrendingLabel = (trending) => {
    switch(trending) {
      case 'hot': return '🔥 HOT';
      case 'rising': return '📈 RISING';
      case 'new': return '⚡ NEW';
      default: return null;
    }
  };

  const currentVideo = videos[currentVideoIndex];

  if (!currentVideo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white flex items-center justify-center">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white">
      {/* Header */}
      <header className="bg-black bg-opacity-40 backdrop-blur-md border-b border-purple-500 border-opacity-30">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Flame className="text-orange-400" size={32} />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
              Dumbfunded
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 px-4 py-2 rounded-full flex items-center space-x-2 shadow-lg">
              <Coins size={20} />
              <span className="font-bold">{dumbsUps.toLocaleString()}</span>
              <span className="text-sm">DumbsUps</span>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 px-4 py-2 rounded-full flex items-center space-x-2 shadow-lg">
              <DollarSign size={20} />
              <span className="font-bold">{dumbCoins.toLocaleString()}</span>
              <span className="text-sm">DumbCoins</span>
            </div>
            <div className="flex items-center space-x-2 bg-purple-800 bg-opacity-50 px-4 py-2 rounded-full">
              <User size={20} />
              <span className="text-sm">{currentUser?.name}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Recent Donation Ticker */}
      {recentDonation && (
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 py-2 px-4 text-center text-sm font-bold animate-pulse">
          💰 Anonymous just sent {recentDonation.amount} {recentDonation.type} to {recentDonation.creator}!
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Generation Notification */}
        {generationNotification && (
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-full shadow-2xl animate-pulse border-2 border-green-400 font-bold text-lg">
            {generationNotification}
          </div>
        )}

        {/* Navigation */}
        <nav className="flex space-x-4 mb-6">
          <button
            onClick={() => { setCurrentView('feed'); setSelectedCreator(null); }}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition ${
              currentView === 'feed'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg'
                : 'bg-purple-800 bg-opacity-40 hover:bg-opacity-60'
            }`}
          >
            <Home size={20} />
            <span>Feed</span>
          </button>
          <button
            onClick={() => { setCurrentView('leaderboard'); setSelectedCreator(null); }}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition ${
              currentView === 'leaderboard'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg'
                : 'bg-purple-800 bg-opacity-40 hover:bg-opacity-60'
            }`}
          >
            <Flame size={20} />
            <span>Live Challenges</span>
            <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full animate-pulse">LIVE</span>
          </button>
          <button
            onClick={() => { setCurrentView('profile'); setSelectedCreator(null); }}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition ${
              currentView === 'profile'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg'
                : 'bg-purple-800 bg-opacity-40 hover:bg-opacity-60'
            }`}
          >
            <Trophy size={20} />
            <span>Profile</span>
          </button>
          <button
            onClick={() => { setCurrentView('store'); setSelectedCreator(null); }}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition ${
              currentView === 'store'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg'
                : 'bg-purple-800 bg-opacity-40 hover:bg-opacity-60'
            }`}
          >
            <Store size={20} />
            <span>Store</span>
          </button>
        </nav>

        {/* LEADERBOARD VIEW */}
        {currentView === 'leaderboard' && !selectedCreator && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-red-600 to-orange-600 p-6 rounded-2xl border-2 border-red-400 shadow-2xl">
              <h2 className="text-3xl font-bold mb-2 flex items-center space-x-3">
                <Flame size={36} className="animate-pulse" />
                <span>Live Challenges</span>
                <span className="bg-white text-red-600 text-lg px-3 py-1 rounded-full animate-pulse">LIVE</span>
              </h2>
              <p className="text-red-100">Watch creators push their limits in real-time!</p>
            </div>

            {/* Hot Now Section */}
            <div className="bg-black bg-opacity-40 backdrop-blur-md rounded-2xl p-6 border border-orange-500 border-opacity-50">
              <h3 className="text-2xl font-bold mb-4 flex items-center space-x-2">
                <Flame className="text-orange-500" size={28} />
                <span>🔥 Hot Now</span>
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {videos
                  .filter(v => v.isLive && v.trending === 'hot')
                  .slice(0, 2)
                  .map((video) => (
                    <div 
                      key={video.id}
                      className="bg-gradient-to-br from-orange-900 to-red-900 bg-opacity-50 p-4 rounded-xl border-2 border-orange-500 hover:border-orange-400 transition cursor-pointer"
                      onClick={() => setCurrentVideoIndex(videos.indexOf(video))}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="text-4xl">{video.thumbnail}</div>
                          <div>
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded-full animate-pulse">● LIVE</span>
                              <span className="text-xs text-orange-300">{video.views.toLocaleString()} watching</span>
                            </div>
                            <h4 className="font-bold text-lg">{video.title}</h4>
                            <p 
                              className="text-sm text-orange-300 hover:underline cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedCreator(video.creator);
                              }}
                            >
                              @{video.creator}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-green-400 font-bold flex items-center space-x-1">
                          <DollarSign size={16} />
                          <span>${video.fundsRaised.toLocaleString()}</span>
                        </span>
                        {video.timeRemaining && (
                          <span className="text-yellow-400 flex items-center space-x-1">
                            <Clock size={16} />
                            <span>{formatTime(video.timeRemaining)} left</span>
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Rising Stars Section */}
            <div className="bg-black bg-opacity-40 backdrop-blur-md rounded-2xl p-6 border border-green-500 border-opacity-50">
              <h3 className="text-2xl font-bold mb-4 flex items-center space-x-2">
                <TrendingUp className="text-green-500" size={28} />
                <span>📈 Rising Stars</span>
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                {videos
                  .filter(v => v.isLive && v.trending === 'rising')
                  .slice(0, 3)
                  .map((video) => (
                    <div 
                      key={video.id}
                      className="bg-gradient-to-br from-green-900 to-emerald-900 bg-opacity-50 p-4 rounded-xl border-2 border-green-500 hover:border-green-400 transition cursor-pointer"
                      onClick={() => setCurrentVideoIndex(videos.indexOf(video))}
                    >
                      <div className="text-3xl mb-2 text-center">{video.thumbnail}</div>
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded-full animate-pulse">● LIVE</span>
                        <span className="text-xs text-green-300">{video.views.toLocaleString()} 👀</span>
                      </div>
                      <h4 className="font-bold text-sm text-center mb-1">{video.title}</h4>
                      <p 
                        className="text-xs text-green-300 text-center hover:underline cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCreator(video.creator);
                        }}
                      >
                        @{video.creator}
                      </p>
                      <div className="mt-3 flex items-center justify-between text-xs">
                        <span className="text-green-400">${video.fundsRaised.toLocaleString()}</span>
                        {video.timeRemaining && (
                          <span className="text-yellow-400">{formatTime(video.timeRemaining)}</span>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* New Challenges Section */}
            <div className="bg-black bg-opacity-40 backdrop-blur-md rounded-2xl p-6 border border-yellow-500 border-opacity-50">
              <h3 className="text-2xl font-bold mb-4 flex items-center space-x-2">
                <Zap className="text-yellow-500" size={28} />
                <span>⚡ Just Started</span>
              </h3>
              <div className="space-y-3">
                {videos
                  .filter(v => v.isLive && v.trending === 'new')
                  .slice(0, 3)
                  .map((video) => (
                    <div 
                      key={video.id}
                      className="bg-gradient-to-r from-yellow-900 to-amber-900 bg-opacity-50 p-4 rounded-xl border-2 border-yellow-500 hover:border-yellow-400 transition cursor-pointer flex items-center justify-between"
                      onClick={() => setCurrentVideoIndex(videos.indexOf(video))}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="text-4xl">{video.thumbnail}</div>
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded-full animate-pulse">● LIVE</span>
                            <span className="bg-yellow-500 text-black text-xs px-2 py-0.5 rounded-full font-bold">NEW</span>
                          </div>
                          <h4 className="font-bold">{video.title}</h4>
                          <p 
                            className="text-sm text-yellow-300 hover:underline cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedCreator(video.creator);
                            }}
                          >
                            @{video.creator}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-yellow-300">{video.views.toLocaleString()} watching</div>
                        <div className="text-green-400 font-bold">${video.fundsRaised.toLocaleString()}</div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* All Live Challenges */}
            <div className="bg-black bg-opacity-40 backdrop-blur-md rounded-2xl p-6 border border-purple-500 border-opacity-30">
              <h3 className="text-2xl font-bold mb-4">All Live Challenges</h3>
              <div className="space-y-3">
                {videos
                  .filter(v => v.isLive)
                  .map((video) => (
                    <div 
                      key={video.id}
                      className="bg-purple-900 bg-opacity-30 p-4 rounded-xl hover:bg-opacity-50 transition cursor-pointer flex items-center justify-between"
                      onClick={() => setCurrentVideoIndex(videos.indexOf(video))}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="text-3xl">{video.thumbnail}</div>
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded-full animate-pulse">● LIVE</span>
                            {getTrendingLabel(video.trending) && (
                              <span className="text-xs bg-purple-700 px-2 py-0.5 rounded-full">{getTrendingLabel(video.trending)}</span>
                            )}
                          </div>
                          <h4 className="font-bold">{video.title}</h4>
                          <p 
                            className="text-sm text-purple-300 hover:underline cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedCreator(video.creator);
                            }}
                          >
                            @{video.creator}
                          </p>
                        </div>
                      </div>
                      <div className="text-right space-y-1">
                        <div className="text-sm text-purple-300">{video.views.toLocaleString()} 👀</div>
                        <div className="text-green-400 font-bold flex items-center justify-end space-x-1">
                          <DollarSign size={16} />
                          <span>{video.fundsRaised.toLocaleString()}</span>
                        </div>
                        {video.timeRemaining && (
                          <div className="text-xs text-yellow-400 flex items-center justify-end space-x-1">
                            <Clock size={14} />
                            <span>{formatTime(video.timeRemaining)} left</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* CREATOR PROFILE VIEW */}
        {selectedCreator && creatorProfiles[selectedCreator] && (
          <div className="space-y-6">
            <button
              onClick={() => setSelectedCreator(null)}
              className="text-purple-300 hover:text-white flex items-center space-x-2"
            >
              <span>← Back to {currentView === 'leaderboard' ? 'Live Challenges' : 'Feed'}</span>
            </button>

            {(() => {
              const profile = creatorProfiles[selectedCreator];
              return (
                <>
                  {/* Profile Header */}
                  <div className="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-2xl p-8 border border-purple-500">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center space-x-6">
                        <div className="text-8xl">{profile.avatar}</div>
                        <div>
                          <div className="flex items-center space-x-3 mb-2">
                            <h2 className="text-4xl font-bold">{profile.name}</h2>
                            {profile.isLive && (
                              <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm animate-pulse">● LIVE</span>
                            )}
                          </div>
                          <p className="text-purple-300 mb-4 max-w-2xl">{profile.bio}</p>
                          <div className="flex items-center space-x-4 text-sm text-purple-300">
                            <span className="flex items-center space-x-1">
                              <Calendar size={16} />
                              <span>Joined {profile.joinedDate}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <User size={16} />
                              <span>{profile.followers.toLocaleString()} followers</span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={handleFollow}
                        disabled={userEngagement.following.includes(selectedCreator)}
                        className={`px-6 py-3 rounded-lg font-bold flex items-center space-x-2 transition ${
                          userEngagement.following.includes(selectedCreator)
                            ? 'bg-gray-600 cursor-not-allowed opacity-50'
                            : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500'
                        }`}
                      >
                        <UserPlus size={20} />
                        <span>{userEngagement.following.includes(selectedCreator) ? 'Following' : 'Follow +10'}</span>
                      </button>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="bg-black bg-opacity-30 p-4 rounded-xl text-center">
                        <div className="text-3xl font-bold text-green-400">${profile.totalRaised.toLocaleString()}</div>
                        <div className="text-sm text-purple-300">Total Raised</div>
                      </div>
                      <div className="bg-black bg-opacity-30 p-4 rounded-xl text-center">
                        <div className="text-3xl font-bold text-blue-400">{profile.challengesCompleted}</div>
                        <div className="text-sm text-purple-300">Challenges Completed</div>
                      </div>
                      <div className="bg-black bg-opacity-30 p-4 rounded-xl text-center">
                        <div className="text-3xl font-bold text-purple-400">{profile.followers.toLocaleString()}</div>
                        <div className="text-sm text-purple-300">Followers</div>
                      </div>
                    </div>

                    {/* Badges */}
                    <div className="mb-6">
                      <h3 className="text-lg font-bold mb-3 flex items-center space-x-2">
                        <Award size={20} className="text-yellow-400" />
                        <span>Achievements</span>
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {profile.badges.map((badge, idx) => (
                          <span key={idx} className="bg-gradient-to-r from-yellow-600 to-orange-600 px-4 py-2 rounded-full text-sm font-bold">
                            {badge}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Currently Live */}
                    {profile.isLive && profile.currentChallenge && (
                      <div className="bg-gradient-to-r from-red-600 to-orange-600 p-4 rounded-xl mb-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm font-bold mb-1">🔴 LIVE NOW</div>
                            <div className="text-lg font-bold">{profile.currentChallenge}</div>
                          </div>
                          <button className="bg-white text-red-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition flex items-center space-x-2">
                            <ExternalLink size={20} />
                            <span>Watch Live</span>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Platform Links */}
                    <div className="flex items-center space-x-4">
                      <span className="text-purple-300 font-semibold">Find me on:</span>
                      {profile.platforms.twitch && (
                        <a 
                          href={`https://twitch.tv/${profile.platforms.twitch}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 bg-purple-700 hover:bg-purple-600 px-4 py-2 rounded-lg transition"
                        >
                          <TwitchIcon size={20} />
                          <span>Twitch</span>
                          <ExternalLink size={16} />
                        </a>
                      )}
                      {profile.platforms.youtube && (
                        <a 
                          href={`https://youtube.com/@${profile.platforms.youtube}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 bg-red-700 hover:bg-red-600 px-4 py-2 rounded-lg transition"
                        >
                          <Youtube size={20} />
                          <span>YouTube</span>
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Past Challenges */}
                  <div className="bg-black bg-opacity-40 backdrop-blur-md rounded-2xl p-6 border border-purple-500 border-opacity-30">
                    <h3 className="text-2xl font-bold mb-4 flex items-center space-x-2">
                      <Target size={24} />
                      <span>Challenge History</span>
                    </h3>
                    <div className="space-y-3">
                      {profile.pastChallenges.map((challenge, idx) => (
                        <div key={idx} className="bg-purple-900 bg-opacity-30 p-4 rounded-xl flex items-center justify-between">
                          <div>
                            <div className="flex items-center space-x-3 mb-1">
                              <span className="text-2xl">{challenge.outcome}</span>
                              <h4 className="font-bold">{challenge.title}</h4>
                            </div>
                            <div className="text-sm text-purple-300">{challenge.date}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-green-400 font-bold text-lg">${challenge.raised.toLocaleString()}</div>
                            <div className="text-xs text-purple-300">raised</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
        )}

        {/* Feed View - Rest of your original code */}
        {currentView === 'feed' && !selectedCreator && (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <div className="bg-black bg-opacity-40 backdrop-blur-md rounded-2xl overflow-hidden border border-purple-500 border-opacity-30 shadow-2xl">
                <div className="aspect-video bg-gradient-to-br from-purple-800 to-indigo-900 flex items-center justify-center relative">
                  <div className="text-center">
                    <div className="text-8xl mb-4">{currentVideo.thumbnail}</div>
                    <h2 className="text-2xl font-bold mb-2">{currentVideo.title}</h2>
                    <p 
                      className="text-purple-300 hover:underline cursor-pointer"
                      onClick={() => setSelectedCreator(currentVideo.creator)}
                    >
                      @{currentVideo.creator}
                    </p>
                    
                    <div className="mt-4 space-y-2">
                      {currentVideo.isLive && (
                        <div className="flex items-center justify-center space-x-2">
                          <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm animate-pulse">● LIVE NOW</span>
                          {currentVideo.timeRemaining && (
                            <span className="bg-yellow-600 text-white px-3 py-1 rounded-full text-sm">
                              ⏱️ {formatTime(currentVideo.timeRemaining)} left
                            </span>
                          )}
                        </div>
                      )}
                      <div className="flex items-center justify-center space-x-2 text-sm bg-black bg-opacity-30 px-4 py-2 rounded-lg inline-block">
                        <DollarSign className="text-green-400" size={16} />
                        <span className="text-green-400 font-bold">${currentVideo.fundsRaised.toLocaleString()} raised</span>
                      </div>
                      <div className="flex items-center justify-center space-x-4 text-xs">
                        <div className="flex items-center space-x-1 bg-yellow-600 bg-opacity-20 px-3 py-1 rounded-full">
                          <Coins className="text-yellow-400" size={14} />
                          <span className="text-yellow-300">{(currentVideo.dumbsUpsReceived || 0).toLocaleString()} DumbsUps</span>
                        </div>
                        <div className="flex items-center space-x-1 bg-green-600 bg-opacity-20 px-3 py-1 rounded-full">
                          <DollarSign className="text-green-400" size={14} />
                          <span className="text-green-300">{(currentVideo.dumbCoinsReceived || 0).toLocaleString()} DumbCoins</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleFollow}
                    disabled={userEngagement.following.includes(currentVideo.creator)}
                    className={`absolute top-4 right-4 px-4 py-2 rounded-full font-bold flex items-center space-x-2 transition ${
                      userEngagement.following.includes(currentVideo.creator)
                        ? 'bg-gray-600 cursor-not-allowed opacity-50'
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500'
                    }`}
                  >
                    <UserPlus size={18} />
                    <span>{userEngagement.following.includes(currentVideo.creator) ? 'Following' : 'Follow +10'}</span>
                  </button>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 text-sm text-purple-300">
                      <span>{currentVideo.views.toLocaleString()} views</span>
                      <span className="flex items-center space-x-1">
                        <Clock size={14} />
                        <span>{watchTime}s</span>
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {currentVideo.isLive && (
                        <div className="text-xs bg-red-600 px-3 py-1 rounded-full border border-red-400 animate-pulse">
                          ● LIVE
                        </div>
                      )}
                      {currentVideo.trending && getTrendingLabel(currentVideo.trending) && (
                        <div className="text-xs bg-purple-600 bg-opacity-50 px-3 py-1 rounded-full border border-purple-400">
                          {getTrendingLabel(currentVideo.trending)}
                        </div>
                      )}
                      {currentVideo.generated && (
                        <div className="text-xs bg-blue-600 bg-opacity-50 px-3 py-1 rounded-full border border-blue-400">
                          🤖 AI Generated
                        </div>
                      )}
                      {hasCompletedOnboarding && (
                        <div className="text-xs bg-green-600 bg-opacity-30 px-3 py-1 rounded-full border border-green-500">
                          For You
                        </div>
                      )}
                      <div className="text-sm font-bold text-yellow-400 bg-yellow-900 bg-opacity-30 px-3 py-1 rounded-full">
                        {currentVideoIndex + 1} / {videos.length}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {currentVideo.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-purple-700 bg-opacity-50 rounded-full text-xs">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <button
                      onClick={handleLike}
                      className="col-span-2 bg-gradient-to-r from-pink-600 to-red-600 hover:from-pink-500 hover:to-red-500 py-4 rounded-xl font-bold flex items-center justify-center space-x-2 transition"
                    >
                      <Heart size={24} />
                      <span>Like +5</span>
                    </button>
                    <button
                      onClick={handleSkip}
                      className="bg-purple-800 bg-opacity-60 hover:bg-opacity-80 py-3 rounded-xl font-bold flex items-center justify-center space-x-2 transition"
                    >
                      <SkipForward size={20} />
                      <span>Skip</span>
                    </button>
                    <button
                      onClick={handleNotInterested}
                      className="bg-red-900 bg-opacity-60 hover:bg-opacity-80 py-3 rounded-xl font-bold flex items-center justify-center space-x-2 transition"
                    >
                      <ThumbsDown size={20} />
                      <span>Not Interested</span>
                    </button>
                  </div>

                  <button
                    onClick={() => setShowDonationModal(true)}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 py-4 rounded-xl font-bold flex items-center justify-center space-x-2 transition"
                  >
                    <Gift size={24} />
                    <span>Donate</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {!hasCompletedOnboarding && (
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6 border border-purple-400 shadow-lg">
                  <h3 className="text-xl font-bold mb-3 flex items-center space-x-2">
                    <Flame size={20} className="text-yellow-300" />
                    <span>Building Your Profile</span>
                  </h3>
                  <p className="text-sm text-purple-100 mb-4">Keep interacting to personalize your feed!</p>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progress</span>
                    <span className="font-bold">
                      {Math.min(userEngagement.likes.length + userEngagement.skips.length + userEngagement.notInterested.length, 10)}/10
                    </span>
                  </div>
                  <div className="w-full bg-purple-900 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full transition-all" 
                      style={{ 
                        width: `${Math.min((userEngagement.likes.length + userEngagement.skips.length + userEngagement.notInterested.length) * 10, 100)}%` 
                      }} 
                    />
                  </div>
                </div>
              )}

              {hasCompletedOnboarding && (
                <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-6 border border-green-400 shadow-lg">
                  <h3 className="text-xl font-bold mb-2 flex items-center space-x-2">
                    <TrendingUp size={20} />
                    <span>Personalization Active!</span>
                  </h3>
                  <p className="text-sm text-green-100">Your feed is now tailored to your preferences!</p>
                </div>
              )}

              <div className="bg-black bg-opacity-40 backdrop-blur-md rounded-2xl p-6 border border-purple-500 border-opacity-30">
                <h3 className="text-xl font-bold mb-4">Your Wallet</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center bg-yellow-600 bg-opacity-20 p-3 rounded-lg">
                    <span className="text-yellow-300">DumbsUps (Free)</span>
                    <span className="font-bold text-yellow-400">{dumbsUps.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center bg-green-600 bg-opacity-20 p-3 rounded-lg">
                    <span className="text-green-300">DumbCoins (Premium)</span>
                    <span className="font-bold text-green-400">{dumbCoins.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="bg-black bg-opacity-40 backdrop-blur-md rounded-2xl p-6 border border-purple-500 border-opacity-30">
                <h3 className="text-xl font-bold mb-4">Your Activity</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-purple-300">Videos Liked</span>
                    <span className="font-bold text-pink-400">{userEngagement.likes.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-300">Creators Following</span>
                    <span className="font-bold text-green-400">{userEngagement.following.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Profile View */}
        {currentView === 'profile' && !selectedCreator && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-black bg-opacity-40 backdrop-blur-md rounded-2xl p-8 border border-purple-500 border-opacity-30">
              <div className="flex items-center space-x-6 mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                  <User size={48} />
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-2">{currentUser?.name}</h2>
                  <div className="flex items-center space-x-2 text-purple-300">
                    <Coins size={20} className="text-yellow-400" />
                    <span>{dumbsUps.toLocaleString()} DumbsUps</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="bg-purple-900 bg-opacity-30 p-6 rounded-xl text-center">
                  <div className="text-3xl font-bold text-yellow-400">{dumbsUps.toLocaleString()}</div>
                  <div className="text-sm text-purple-300 mt-2">DumbsUps (Free)</div>
                </div>
                <div className="bg-purple-900 bg-opacity-30 p-6 rounded-xl text-center">
                  <div className="text-3xl font-bold text-green-400">{dumbCoins.toLocaleString()}</div>
                  <div className="text-sm text-purple-300 mt-2">DumbCoins (Premium)</div>
                </div>
                <div className="bg-purple-900 bg-opacity-30 p-6 rounded-xl text-center">
                  <div className="text-3xl font-bold text-blue-400">{userEngagement.likes.length}</div>
                  <div className="text-sm text-purple-300 mt-2">Videos Liked</div>
                </div>
              </div>

              <h3 className="text-2xl font-bold mb-4">Your Tag Preferences</h3>
              <div className="space-y-3">
                {Object.entries(userEngagement.tagWeights)
                  .sort(([, a], [, b]) => b - a)
                  .map(([tag, weight]) => (
                    <div key={tag} className="flex items-center justify-between bg-purple-900 bg-opacity-30 p-4 rounded-lg">
                      <span className="font-semibold">#{tag}</span>
                      <div className="flex items-center space-x-3">
                        <div className="w-32 bg-purple-900 rounded-full h-3">
                          <div 
                            className={`h-3 rounded-full ${weight > 0 ? 'bg-gradient-to-r from-pink-500 to-purple-500' : 'bg-red-600'}`}
                            style={{ width: `${Math.min(Math.abs(weight) * 20, 100)}%` }}
                          />
                        </div>
                        <span className={`font-bold ${weight > 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {weight > 0 ? '+' : ''}{weight.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* Store View */}
        {currentView === 'store' && !selectedCreator && (
          <div className="max-w-5xl mx-auto">
            <div className="bg-black bg-opacity-40 backdrop-blur-md rounded-2xl p-8 border border-purple-500 border-opacity-30">
              <h2 className="text-3xl font-bold mb-6 flex items-center space-x-3">
                <Store size={32} className="text-green-400" />
                <span>DumbCoins Store</span>
              </h2>
              <div className="bg-green-900 bg-opacity-30 p-4 rounded-lg mb-6 border border-green-500 border-opacity-30">
                <p className="text-green-300 font-semibold">💎 DumbCoins are premium currency</p>
                <p className="text-sm text-purple-300 mt-1">Exchange Rate: 5 DumbCoins = $1.00 USD</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {storeItems.map(item => (
                  <div 
                    key={item.id} 
                    className={`bg-purple-900 bg-opacity-30 p-6 rounded-xl border-2 transition hover:scale-105 ${
                      item.popular ? 'border-yellow-400' : item.bestValue ? 'border-green-400' : 'border-purple-500 border-opacity-30'
                    }`}
                  >
                    {item.popular && (
                      <div className="bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full inline-block mb-2">
                        ⭐ POPULAR
                      </div>
                    )}
                    {item.bestValue && (
                      <div className="bg-green-400 text-black text-xs font-bold px-3 py-1 rounded-full inline-block mb-2">
                        🏆 BEST VALUE
                      </div>
                    )}
                    <div className="text-5xl mb-4">{item.icon}</div>
                    <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                    <div className="text-3xl font-bold text-green-400 mb-2">${item.price.toFixed(2)}</div>
                    <div className="text-sm text-purple-300 mb-4">{item.dumbCoins} DumbCoins</div>
                    <button
                      onClick={() => purchaseDumbCoins(item.dumbCoins, item.price)}
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 py-3 rounded-lg font-bold transition"
                    >
                      Purchase
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Donation Modal */}
      {showDonationModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50" 
          onClick={() => setShowDonationModal(false)}
        >
          <div 
            className="bg-gradient-to-br from-purple-900 to-indigo-900 p-8 rounded-2xl max-w-md w-full border border-purple-500" 
            onClick={e => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold mb-4">Donate to {currentVideo.creator}</h3>
            
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setDonationType('ups')}
                className={`flex-1 py-3 rounded-lg font-bold transition ${
                  donationType === 'ups' 
                    ? 'bg-gradient-to-r from-yellow-600 to-orange-600' 
                    : 'bg-purple-800 bg-opacity-50'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <Coins size={20} />
                  <span>DumbsUps</span>
                </div>
                <div className="text-xs mt-1">Balance: {dumbsUps.toLocaleString()}</div>
              </button>
              <button
                onClick={() => setDonationType('coins')}
                className={`flex-1 py-3 rounded-lg font-bold transition ${
                  donationType === 'coins' 
                    ? 'bg-gradient-to-r from-green-600 to-emerald-600' 
                    : 'bg-purple-800 bg-opacity-50'
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <DollarSign size={20} />
                  <span>DumbCoins</span>
                </div>
                <div className="text-xs mt-1">Balance: {dumbCoins.toLocaleString()}</div>
              </button>
            </div>

            <div className="mb-6">
              <label className="block text-sm text-purple-300 mb-2">Amount</label>
              <input
                type="number"
                value={donationAmount}
                onChange={(e) => setDonationAmount(parseInt(e.target.value) || 0)}
                className="w-full bg-purple-800 bg-opacity-50 border border-purple-500 rounded-lg px-4 py-3 text-white text-lg"
                min="1"
              />
              <div className="flex gap-2 mt-3">
                {donationType === 'ups' 
                  ? [10, 25, 50, 100, 500].map(amt => (
                      <button
                        key={amt}
                        onClick={() => setDonationAmount(amt)}
                        className="flex-1 bg-purple-700 hover:bg-purple-600 py-2 rounded-lg text-sm font-bold transition"
                      >
                        {amt}
                      </button>
                    ))
                  : [5, 10, 25, 50, 100].map(amt => (
                      <button
                        key={amt}
                        onClick={() => setDonationAmount(amt)}
                        className="flex-1 bg-purple-700 hover:bg-purple-600 py-2 rounded-lg text-sm font-bold transition"
                      >
                        {amt}
                      </button>
                    ))
                }
              </div>
              {donationType === 'coins' && (
                <div className="text-sm text-green-400 font-bold mt-2">
                  = ${(donationAmount / 5).toFixed(2)} USD
                </div>
              )}
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => handleDonate(donationAmount, donationType)}
                className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 py-3 rounded-lg font-bold"
              >
                Donate
              </button>
              <button
                onClick={() => setShowDonationModal(false)}
                className="flex-1 bg-gray-700 hover:bg-gray-600 py-3 rounded-lg font-bold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DumbfundedApp;