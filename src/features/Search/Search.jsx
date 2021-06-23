import { SearchNav, SearchBody } from "..";
import "./Search.css";

export default function Search() {
  return (
    <div className="search">
      <SearchNav />
      <div className="search-content">
        <SearchBody />
      </div>
    </div>
  );
}
