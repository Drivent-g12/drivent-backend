import { Hotel, PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
const prisma = new PrismaClient();

async function main() {
  let event = await prisma.event.findFirst();
  if (!event) {
    event = await prisma.event.create({
      data: {
        title: "Driven.t",
        logoImageUrl: "https://files.driven.com.br/images/logo-rounded.png",
        backgroundImageUrl: "linear-gradient(to right, #FA4098, #FFD77F)",
        startsAt: dayjs().toDate(),
        endsAt: dayjs().add(21, "days").toDate(),
      },
    });
  }

  let ticketType = await prisma.ticketType.findFirst();
  if (!ticketType) {
    await prisma.ticketType.createMany({
      data:[
        {
          name:"Remote",
          isRemote: true,
          includesHotel: false,
          price: 500
        },
        {
          name:"No hotel",
          isRemote: false,
          includesHotel: false,
          price: 550
        },
        {
          name:"With hotel",
          isRemote: false,
          includesHotel: true,
          price: 650
        }
      ]
    })
  }

  let hotels = await prisma.hotel.findFirst();
  if (!hotels) {
    let hotelsData = [
      {
        name: "Driven Resort",
        image: "https://www.salinas.com.br/img/layout/maceio/resort/salinas-maceio-all-inclusive-resort-01-mob.jpg",
      },
      {
        name: "Driven Deluxe",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtMBWMPZDa3vl0lzQi-9sXPF2IiYpPp-DICR1EgET2ytk3WhSpqIFRQSYSuTcHJPmxl-U&usqp=CAU"
      },
      {
        name: "Driven Pousada",
        image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/07/6b/92/78/pousada-das-pedras.jpg?w=1200&h=-1&s=1"
      }
    ]
    let roomsData = [
      {name:'100',capacity:1},
      {name:'101',capacity:2},
      {name:'102',capacity:3},
      {name:'103',capacity:2},
      {name:'104',capacity:3},
      {name:'105',capacity:1},
      {name:'106',capacity:2},
      {name:'107',capacity:1},
    ]
    for(let i = 0 ; i < 3 ; i++){
      await prisma.hotel.create({
        data:{
          name: hotelsData[i].name,
          image: hotelsData[i].image,
          Rooms:{
            createMany:{
              data: roomsData
            }
          }
        }
      }) 
    }
  }

  console.log({ event });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
