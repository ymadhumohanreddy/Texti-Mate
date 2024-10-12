import { FaLinkedin, FaGithub } from 'react-icons/fa'; // Import LinkedIn and GitHub icons

const Header = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <img src="/images/logo2.png" alt="logo" style={{ height: 112 }} />
      <h1 style={{ marginLeft: '10px', fontFamily: 'Times New Roman' }} onClick={() => window.location.reload()}>
        TextiMate
      </h1>
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
        <a href="https://www.linkedin.com/in/madhu-yeddula-469583274/" target="_blank" rel="noopener noreferrer" style={{ margin: '0 10px' }}>
          <FaLinkedin style={{ color: '#5095f8', fontSize: '24px' }} />
        </a>
        <a href="https://github.com/ymadhumohanreddy" target="_blank" rel="noopener noreferrer" style={{ margin: '0 10px' }}>
          <FaGithub style={{ color: '#5095f8', fontSize: '24px' }} />
        </a>
      </div>
    </div>
  );
};

export default Header;
