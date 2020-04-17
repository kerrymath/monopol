// properties
import goImg from '../images/corners/go.png'
import jailImg from '../images/corners/jail.jpg'
import parkingImg from '../images/corners/parking.jpg'
import policeImg from '../images/corners/police.jpg'
// cards
import chanceImg from '../images/utils/chance.png'
import communityImg from '../images/utils/community.jpg'
//utility
import bulbImg from '../images/utils/bulb.png'
import railImg from '../images/utils/rail.jpg'
import pipeImg from '../images/utils/pipe.png'
import ringImg from '../images/utils/ring.jpg'
import taxImg from '../images/utils/tax.png'

const BoardProperties = [
  {
    type: 'middleCard',
    properties: [
      {
        id: 'chance',
        image: chanceImg,
        position: {top: '830px', left: '878px', height: '300px',
        width: '200px', transform: 'rotate(45deg)'}
      },
      {
        id: 'community',
        image: communityImg,
        position: {top: '310px', left: '353px', height: '300px',
        width: '200px', transform: 'rotate(45deg)'}
      }
    ]
  },
  {
    type: 'corner',
    properties: [
      {
        id: 'b1',
        title: 'go',
        image: goImg,
        position: {top: '1278px', left: '1278px'}
      },
      {
        id: 'l1',
        title: 'jail',
        image: jailImg,
        position: {top: '1278px', left: '0'}
      },
      {
        id: 't1',
        title: 'free parking',
        image: parkingImg,
        position: {top: '0px', left: '0'}
      },
      {
        id: 'r1',
        title: 'feds',
        image: policeImg,
        position: {top: '0', left: '1278px'}
      }
    ]
  },
  {
    type: 'property',
    colour:'c1',
    properties: [
      {
        id: 'b2',
        title: 'Mathurin Ave',
        price: '300',
        rent: '500',
        position: {top: '1278px', left: '1158px'}
      },
      {
        id: 'b4',
        title: 'AJ Street',
        price: '400',
        rent: '600',
        position: {top: '1278px', left: '918px'}
      }
    ]
  },
  {
    type: 'property',
    colour:'c2',
    properties: [
      {
        id: 'b7',
        title: 'Central Ave',
        price: '100',
        rent: '200',
        position: {top: '1278px', left: '558px'}
      },
      {
        id: 'b9',
        title: 'Middle Street',
        price: '150',
        rent: '150',
        position: {top: '1278px', left: '318px'}
      },
      {
        id: 'b10',
        title: 'End Crest',
        price: '300',
        rent: '350',
        position: {top: '1278px', left: '198px'}
      }
    ]
  },
  {
    type: 'property',
    colour:'c3',
    properties: [
      {
        id: 'l2',
        title: 'Chest Ave',
        price: '100',
        rent: '200',
        position: {top: '1117px', left: '39px', transform: 'rotate(90deg)'}
      },
      {
        id: 'l4',
        title: 'Back Ave',
        price: '120',
        rent: '320',
        position: {top: '877px', left: '39px', transform: 'rotate(90deg)'}
      },
      {
        id: 'l5',
        title: 'Buttock Ave',
        price: '400',
        rent: '420',
        position: {top: '757px', left: '39px', transform: 'rotate(90deg)'}
      },
    ]
  },
  {
    type: 'property',
    colour:'c4',
    properties: [
      {
        id: 'l7',
        title: 'Plumb Arc',
        price: '100',
        rent: '200',
        position: {top: '517px', left: '39px', transform: 'rotate(90deg)'}
      },
      {
        id: 'l9',
        title: 'Cherry Ave',
        price: '120',
        rent: '320',
        position: {top: '277px', left: '39px', transform: 'rotate(90deg)'}
      },
      {
        id: 'l10',
        title: 'Mango street',
        price: '400',
        rent: '420',
        position: {top: '157px', left: '39px', transform: 'rotate(90deg)'}
      },
    ]
  },
  {
    type: 'property',
    colour:'c5',
    properties: [
      {
        id: 'l2',
        title: 'Button Arc',
        price: '100',
        rent: '200',
        position: {top: '0px', left: '198px', transform: 'rotate(0deg)'}
      },
      {
        id: 'l4',
        title: 'Zipper Ave',
        price: '120',
        rent: '320',
        position: {top: '0px', left: '438px', transform: 'rotate(0deg)'}
      },
      {
        id: 'l5',
        title: 'Cotton street',
        price: '400',
        rent: '420',
        position: {top: '0px', left: '558px', transform: 'rotate(0deg)'}
      },
    ]
  },
  {
    type: 'property',
    colour:'c6',
    properties: [
      {
        id: 'l7',
        title: 'Lime close',
        price: '330',
        rent: '440',
        position: {top: '0px', left: '798px', transform: 'rotate(0deg)'}
      },
      {
        id: 'l8',
        title: 'Grape open',
        price: '120',
        rent: '220',
        position: {top: '0px', left: '918px', transform: 'rotate(0deg)'}
      },
      {
        id: 'l10',
        title: 'Pear street',
        price: '100',
        rent: '150',
        position: {top: '0px', left: '1158px', transform: 'rotate(0deg)'}
      },
    ]
  },
  {
    type: 'property',
    colour:'c7',
    properties: [
      {
        id: 'r2',
        title: 'Nandos',
        price: '330',
        rent: '440',
        position: {top: '157px', left: '1317px', transform: 'rotate(270deg)'}
      },
      {
        id: 'r3',
        title: "Mc d's",
        price: '120',
        rent: '220',
        position: {top: '277px', left: '1317px', transform: 'rotate(270deg)'}
      },
      {
        id: 'r5',
        title: 'KFC',
        price: '100',
        rent: '150',
        position: {top: '517px', left: '1317px', transform: 'rotate(270deg)'}
      },
    ]
  },
  {
    type: 'property',
    colour:'c8',
    properties: [
      {
        id: 'r8',
        title: 'Close Ave',
        price: '330',
        rent: '440',
        position: {top: '877px', left: '1317px', transform: 'rotate(270deg)'}
      },
      {
        id: 'r10',
        title: "Ave Close",
        price: '120',
        rent: '220',
        position: {top: '1117px', left: '1317px', transform: 'rotate(270deg)'}
      },
    ]
  },
  {
    type: 'utility',
    properties: [
      {
        id: 'b5',
        title: "Income Tax",
        price: '200',
        image: taxImg,
        position: {top: '1278px', left: '798px'}
      },
      {
        id: 'b6',
        title: "Kerrys Railroad",
        price: '300',
        image: railImg,
        position: {top: '1278px', left: '678px'}
      },
      {
        id: 'l3',
        title: "Electric Company",
        price: '150',
        image: bulbImg,
        position: {top: '997px', left: '39px', transform: 'rotate(90deg)'}
      },
      {
        id: 'l6',
        title: "Milton Railroad",
        price: '300',
        image: railImg,
        position: {top: '637px', left: '39px', transform: 'rotate(90deg)'}
      },
      {
        id: 't6',
        title: "Ama Railroad",
        price: '150',
        image: railImg,
        position: {top: '0px', left: '678px', transform: 'rotate(0deg)'}
      },
      {
        id: 't9',
        title: "Water Works",
        price: '150',
        image: pipeImg,
        position: {top: '0px', left: '1038px', transform: 'rotate(0deg)'}
      },
      {
        id: 'r6',
        title: "Euston Railroad",
        price: '180',
        image: railImg,
        position: {top: '637px', left: '1317px', transform: 'rotate(270deg)'}
      },
      {
        id: 't8',
        title: "Luxury tax",
        price: '150',
        image: ringImg,
        position: {top: '997px', left: '1317px', transform: 'rotate(270deg)'}
      }
    ]
  },
  {
    type: 'cards',
    properties: [
      {
        id: 'b3',
        title: "Community Chest",
        image: communityImg,
        position: {top: '1278px', left: '1038px'}
      },
      {
        id: 'l8',
        title: "Community Chest",
        image: communityImg,
        position: {top: '397px', left: '39px', transform: 'rotate(90deg)'}
      },
      {
        id: 'l4',
        title: "Community Chest",
        image: communityImg,
        position: {top: '397px', left: '1317px', transform: 'rotate(270deg)'}
      },
      {
        id: 'b8',
        title: "Chance",
        image: chanceImg,
        position: {top: '1278px', left: '438px'}
      },
      {
        id: 't3',
        title: "Chance",
        image: chanceImg,
        position: {top: '0px', left: '318px', transform: 'rotate(0deg)'}
      },
      {
        id: 'r7',
        title: "Chance",
        image: chanceImg,
        position: {top: '757px', left: '1317px', transform: 'rotate(270deg)'}
      },
    ]
  }
]

export default BoardProperties