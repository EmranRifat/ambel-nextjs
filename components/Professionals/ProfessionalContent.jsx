import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { BiGridAlt, BiSearch } from "react-icons/bi";
import { BsFillXCircleFill } from "react-icons/bs";
import { FaListUl } from "react-icons/fa";
import { FiGrid } from "react-icons/fi";
import GridView from "./GridView";
import ListView from "./ListView";
import Pagination from "./Pagination";
import {
  findProfessionalInfo,
  onCancelAction,
  filterProfessionalInfo,
} from "../../store/actions/findProfessional";
import { toQueryString } from "../../utils/utility";
import FilterOption from "./FilterOption";
import { ScaleLoader } from "react-spinners";

const ProfessionalContent = (props) => {
  const [gridSelected, setGridSelected] = useState(false);
  const [currentPage, setCurrentpage] = useState(1);
  const [profPerPage, setProfPerPage] = useState(6);
  const [practitioners, setPractitioners] = useState([]);
  const [query, setQuery] = useState({
    searchText: "",
  });
  // const [professionalsData, setProfessionalsData] = useState([]);
  // const router = useRouter();
  // const data = router.query;

  // Get current posts
  const showingFrom =
    props.professionals?.length > currentPage * profPerPage
      ? currentPage * profPerPage
      : 1;
  const showingTo =
    props.professionals?.length > currentPage * profPerPage
      ? currentPage * (profPerPage + 1)
      : props.professionals?.length;
  // Change page
  const paginate = (pageNumber) => setCurrentpage(pageNumber);

  useEffect(() => {
    props.findProfessionalInfo();
  }, []);

  useEffect(() => {
    setPractitioners(props.professionals);
  }, [props.professionals]);

  const onFilter = (queryBody) => {
    // let query = toQueryString(queryObject);
    const { selectedCategories, selectedSubCategories } = queryBody;
    // console.log(selectedCategories, selectedSubCategories);
    props.filterProfessionalInfo({ selectedCategories, selectedSubCategories });
  };

  const onSearch = (searchText) => {
    let query = toQueryString(searchText);
    props.findProfessionalInfo(query);
  };
  // console.log(practitioners);
  return (
    <div className="w-full flex justify-between">
      <FilterOption onFilter={onFilter} />
      <div className="w-[1000px] bg-white mr-4 px-6 py-[30px] rounded-lg">
        <div className="w-full flex items-center justify-between border pl-3 h-10 mb-4 border-[#19525AB2] rounded-[8px] hover:ring-1">
          <input
            type="text"
            name="searchText"
            value={query.searchText}
            onChange={(e) => {
              setQuery({ ...query, searchText: e.target.value });
            }}
            placeholder="Search here"
            className="outline-none p-1 w-full "
          />
          {query.searchText.length > 0 && (
            <BsFillXCircleFill
              onClick={() => {
                setQuery({ ...query, searchText: "" });
                onSearch({ searchText: "" });
              }}
              className="text-xl opacity-50 mr-3 cursor-pointer"
            />
          )}
          <div
            onClick={() => {
              if (query.searchText.length > 0) {
                onSearch(query);
              }
            }}
            className="inline-flex items-center text-[16px] cursor-pointer text-white bg-[#19525A] h-full w-[120px] justify-center border-[#19525AB2] rounded-r-[8px] hover:ring-1"
          >
            <span>
              <BiSearch className="mx-1" />
            </span>
            Search
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center py-2 text-[16px] text-[#5B5B5B] font-[500]">
            Showing {showingFrom}-{showingTo} from {practitioners?.length}{" "}
          </div>
          <div className="flex items-center justify-end">
            <select className="w-[40px] h-[20px] cursor-pointer border-[0.5px] border-[#19525AB2] text-[12px] rounded-[4px] mr-2">
              <option
                onChange={() => setProfPerPage(6)}
                value="6"
                className="text-[12px]"
              >
                6
              </option>
              <option
                onChange={() => setProfPerPage(10)}
                value="10"
                className="text-[12px]"
              >
                10
              </option>
              <option
                onChange={() => setProfPerPage(15)}
                value="15"
                className="text-[12px]"
              >
                15
              </option>
            </select>
            {gridSelected ? (
              <FaListUl
                onClick={() => {
                  setGridSelected(false);
                }}
                className="text-2xl font-extrabold cursor-pointer"
              />
            ) : (
              <FiGrid
                onClick={() => {
                  setGridSelected(true);
                }}
                className="text-2xl cursor-pointer"
              />
            )}
          </div>
        </div>
        {/* grid view */}
        {props.loading ? (
          <div className="flex justify-center items-center h-40">
            <ScaleLoader color="#5B5B5B" height={40} width={10} />
          </div>
        ) : gridSelected ? (
          <div className="my-2 w-full grid  sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 mx-auto gap-3 overflow-ellipsis">
            {practitioners?.map((item, i) => {
              return (
                <div key={i} className="">
                  <GridView item={item} />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center pb-3">
            {practitioners?.map((item, i) => {
              return <ListView key={item.id} item={item} />;
            })}
          </div>
        )}
        <Pagination
          profPerPage={profPerPage}
          totalProf={practitioners?.length}
          selected={currentPage}
          paginate={paginate}
        />
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  // console.log(state.f)
  return {
    info: state?.business?.info,

    professionals: state?.findProfessional?.info?.data ?? [],
    // professionals: state?.filterProfessional?.info?.data ?? [],
    loading: state?.findProfessional?.loading,
  };
};
export default connect(mapStateToProps, {
  findProfessionalInfo,
  onCancelAction,
  filterProfessionalInfo,
})(ProfessionalContent);
