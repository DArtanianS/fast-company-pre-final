function getRandomInt(min: number, max: number):number {
   return Math.floor(Math.random() * (max - min + 1) + min)
}

interface IUserData {
   rate: number
   completedMeetings: number
   image: string
}

function generateUserData(): IUserData {
   return {
      rate: getRandomInt(1, 5),
      completedMeetings: getRandomInt(0, 200),
      image: `https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
      .toString(36)
      .substring(7)}.svg`,
   }
}

export default generateUserData
