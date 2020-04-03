import goImg from '../images/corners/go.png'

const BoardProperties = [
  {
    type: 'corner',
    properties: [
      {
        title: 'GO',
        image: goImg,
        position: {top: '1278px', left: '1278px'}
      }
    ]
  },
  {
    type: 'property',
    colour:'c1',
    properties: [
      {
        title: 'Mathurin Ave',
        price: '300',
        rent: '500',
        position: {top: '1278px', left: '1158px'}
      },
      {
        title: 'AJ Street',
        price: '400',
        rent: '600',
        position: {top: '1278px', left: '1038px'}
      }
    ]
  },
  {
    type: 'utility',
    properties: [
      {
        title: "Kerrys Railroad",
        price: '300',
        image: goImg,
        position: {top: '-200px', left: '200px'}
      }
    ]
  },
  {
    type: 'cards',
    properties: [
      {
        title: "Community Chest",
        image: goImg,
        position: {top: '-200px', left: '300px'}
      },
      {
        title: "Chance",
        image: goImg,
        position: {top: '-200px', left: '400px'}
      }
    ]
  }
]

export default BoardProperties