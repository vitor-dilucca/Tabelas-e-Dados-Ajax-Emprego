import Menu from './Menu';
import '../App.css';
import PropTypes from 'prop-types';

const Layout = ({
  title = 'Title',
  description = 'Description',
  className,
  children,
}) => (
  <div>
    <Menu />
    <div className="p-4 bg-body-secondary jumbotron">
      <div className="container">
        <h2>{title}</h2>
        <p className="lead">{description}</p>
      </div>
    </div>
    <div className={className}>{children}</div>
  </div>
);

Layout.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Layout;
