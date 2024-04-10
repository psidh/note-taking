export default function Header() {
  return (
    <div className='flex justify-between py-16 px-10 bg-white'>
      <div>
        <h1>© Task Tracker | 2024 All Rights Reserved</h1>
      </div>

      <div className='flex justify-between px-8 space-x-8'>
        <a href='/about'>FaceBook</a>
        <a href='/about'>Instagram</a>
        <a href='/about'>Twitter</a>
        <a href='/about'>Discord</a>
      </div>
    </div>
  );
}
