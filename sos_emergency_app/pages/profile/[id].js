import { useRouter } from 'next/router';

export default function Profile() {
  const router = useRouter();
  const { id } = router.query;

  return <h1>Profile Page for User ID: {id}</h1>;
}