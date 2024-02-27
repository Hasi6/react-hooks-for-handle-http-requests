import { useMutation } from './hooks/useMutate';
import { useQuery } from './hooks/useQuery';
import { HTTP_TYPES } from './utils/constants';

type User = {
  email: string;
  id: number;
  name: string;
  username: string;
};

function App() {
  const { data, loading, error, retry } = useQuery<User[]>({
    url: 'https://jsonplaceholder.typicode.com/users',
  });

  const { mutate, loading: mutationLoading } = useMutation({
    url: 'https://jsonplaceholder.typicode.com/posts',
  });

  const handleSubmit = async () => {
    const res = await mutate({}, HTTP_TYPES.POST);
    console.log(res);
  };

  return (
    <>
      <h1>Custom Hooks</h1>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div>
          <h1>UseQuery</h1>
          <button onClick={retry}>Retry</button>
          {loading ? (
            <h2>Loading</h2>
          ) : (
            <div>
              {data?.map((item) => (
                <div key={item.id} style={{ borderBottom: '2px solid gray' }}>
                  <p>Name: {item.name}</p>
                  <p>Username: {item.username}</p>
                  <p>Email: {item.email}</p>
                </div>
              ))}
            </div>
          )}
          {!loading && error ? <h1>Error</h1> : null}
        </div>
        <div>
          <h1>UseMutation</h1>
          <button onClick={handleSubmit}>Submit</button>
          {mutationLoading ? <h2>Submitting</h2> : null}
          {!loading && error ? <h1>Error</h1> : null}
        </div>
      </div>
    </>
  );
}

export default App;
