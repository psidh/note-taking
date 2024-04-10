import AddTodo from '@/components/AddTodo';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Title from '@/components/TitleImage';

export default function Home() {
  return (
    <div>
      <Header />
      <Title />
      <AddTodo />
      <Footer />
    </div>
  );
}
