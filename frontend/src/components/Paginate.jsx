
import { Link } from 'react-router-dom';

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
  return (
    pages > 1 && (
      <div>
        {[...Array(pages).keys()].map((x) => (
          <Link key={x + 1}
            to={
              !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/${x + 1}`
                  : `/page/${x + 1}`
                : `/admin/productlist/${x + 1}`
            }
          >
            <butoon active={x + 1 === page}>{x + 1}</butoon>
          </Link>
        ))}
      </div>
    )
  );
};

export default Paginate;
