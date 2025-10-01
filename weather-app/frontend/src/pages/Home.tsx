import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center',    
        textAlign: 'center',
        backgroundColor: '#f5f5f5', 
        padding: '2rem',
        width: "100%",
        border: "1px solid black",
      }}
    >
      <h1 style={{ marginBottom: '1rem' }}>Welcome to My Full-Stack App</h1>
      <p style={{ marginBottom: '2rem' }}>
        This app will eventually include Weather, Todos, Notes, Blog, and Auth features.
      </p>

      <Link to="/weather">
        <button
          style={{
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            cursor: 'pointer',
            borderRadius: '5px',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            transition: 'background-color 0.3s',
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#0056b3')}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#007bff')}
        >
          Go to Weather App
        </button>
      </Link>
    </div>
  );
};

export default Home;
