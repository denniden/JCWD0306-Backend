import { Box, Center, Flex, Icon, Input, Select } from '@chakra-ui/react';
import {
 Entertaiment,
 Food,
 Expense,
 Groceries,
 Sport,
 Transportation
} from '../assets';
import { useEffect, useState } from 'react';
import { api } from '../api/api';
export const Home = () => {
 const [total, setTotal] = useState(0);
 const [expenses, setExpenses] = useState([]);
 const [datefrom, setDateFrom] = useState('');
 const [dateto, setDateto] = useState('');
 const [category, setCategories] = useState('all');

 const fetchExpenses = () => {
  api
   .get('/expenses')
   .then((res) => setExpenses(res.data))
   .catch((err) => console.log(err));
 };
 useEffect(() => {
  fetchExpenses(0);
 }, []);

 useEffect(() => {
  if (dateto && datefrom)
   api
    .get('/expenses/date-range', {
     params: {
      datefrom,
      dateto
     }
    })
    .then((res) => setTotal(res.data.total))
    .catch((err) => console.log(err));
  else setTotal(0);
 }, [dateto, datefrom]);

 useEffect(() => {
  api
   .get('/expenses/categories/' + category)
   .then((res) => setTotal(res.data.total))
   .catch((err) => console.log(err));
 }, [category]);
 return (
  <Center>
   <Center
    style={{ justifyContent: 'flex-start' }}
    bgColor={'white'}
    maxW={'600px'}
    w={'100%'}
    padding={'20px'}
    paddingTop={'60px'}
    flexDir={'column'}
    gap={'20px'}
    height={'100vh'}
   >
    <Box fontSize={'4xl'} fontWeight={'bold'}>
     Rp {total.toLocaleString('ID-id')}
    </Box>
    <Select
     maxW={'500px'}
     w="full"
     height={'60px'}
     onChange={(e) => setCategories(e.target.value)}
     defaultValue={category}
    >
     <option value="all">All</option>
     <option value="transportation">Transportation</option>
     <option value="groceries">Groceries</option>
     <option value="entertaiment">Entertaiment</option>
     <option value="food">Food</option>
     <option value="sport">Sport</option>
    </Select>
    <Flex maxW={'500px'} w="full" gap={'20px'} height={'60px'}>
     <Input
      width={'full'}
      h={'full'}
      type="date"
      bgColor={'white'}
      onChange={(e) => {
       setDateFrom(e.target.value);
      }}
     />
     <Input
      width="full"
      h={'full'}
      type="date"
      bgColor={'white'}
      onChange={(e) => {
       setDateto(e.target.value);
      }}
     />
    </Flex>

    <Flex
     flexDir={'column'}
     w="full"
     alignItems={'center'}
     gap={'10px'}
     h={'full'}
     overflow={'auto'}
     className="scroll"
    >
     {expenses.map((expense) => (
      <Card {...expense} />
     ))}
    </Flex>
    <Flex justifyContent={'right'} w="full" paddingRight={'20px'}>
     <Icon
      as={Expense}
      position={'absolute'}
      width={'60px'}
      height={'60px'}
      bottom={'30px'}
      onClick={() => {}}
      cursor={'pointer'}
     ></Icon>
    </Flex>
   </Center>
  </Center>
 );
};

const Card = ({
 id = 1,
 name = 'makan bakso',
 nominal = 30000,
 category = 'Food',
 date = '2023-09-1'
}) => {
 const [icon, setIcon] = useState(Entertaiment);
 useEffect(() => {
  switch (category) {
   case 'entertaiment':
    setIcon(Entertaiment);
    break;
   case 'transportation':
    setIcon(Transportation);
    break;
   case 'groceries':
    setIcon(Groceries);
    break;
   case 'food':
    setIcon(Food);
    break;
   case 'sport ':
    setIcon(Sport);
    break;
  }
 }, []);
 return (
  <Flex
   padding={'20px'}
   gap={'20px'}
   w={'full'}
   maxW={'500px'}
   bgColor={'#FCFCFC'}
   borderRadius={'24px'}
   alignItems={'center'}
  >
   <Icon aspectRatio={1} width={'60px'} height={'60px'} as={icon}></Icon>
   <Flex w={'full'} flexDir={'column'} fontSize={'xl'}>
    <Flex justifyContent={'space-between'} w={'full'} alignItems={'center'}>
     <Box style={{ fontWeight: '600' }}>{category}</Box>
     <Box style={{ color: 'red' }}>Rp {nominal.toLocaleString('ID-id')}</Box>
    </Flex>
    <Flex
     justifyContent={'space-between'}
     w={'full'}
     alignItems={'center'}
     color={'#91919F'}
     fontSize={'1rem'}
    >
     <Box>{name}</Box>
     <Box>{date}</Box>
    </Flex>
   </Flex>
  </Flex>
 );
};
