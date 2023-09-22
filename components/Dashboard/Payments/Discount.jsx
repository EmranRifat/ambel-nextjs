import Image from "next/image";
import React, { useEffect, useState } from "react";
import DiscountModal from "./DiscountModal";
import Modal from "../../Modal";
import { connect } from "react-redux";
import { deleteDiscount, getAllDiscounts } from "../../../StatelessAPI/discountApiCalls";

const Discount = (props) => {
  const [showDiscountModal, setShowDiscountModal] = useState(false);

  const [discounts, setDiscounts] = useState([]);
  const [editDiscount, setEditDiscount] = useState(null);

  const _getDiscounts = async () => {
    setDiscounts([]);
    const fetchDiscounts = await getAllDiscounts(props.business._id);
    setDiscounts((prevState) => [...prevState, ...fetchDiscounts]);
  };

  useEffect(() => {
    _getDiscounts();
  }, []);

  const handleDeleteDiscount = async (discountId) => {
    const res = await deleteDiscount(discountId);
    // @ts-ignore
    if (res.status === 204) {
      console.log("deleted");
      _getDiscounts();
    }
  };


  return (
    <>
      <div className="w-full h-[60vh]">
        <div className="w-full flex justify-between">
          <span className=" text-[#5B5B5B] text-[32px]">Discounts</span>

          <button
            className="text-[16px] w-[132px] h-[36px] bg-[#19525A] text-white rounded-[8px]"
            type="button"
            onClick={() => {
              setEditDiscount(null);
              setShowDiscountModal(true)
            }}
          >
            New Discount
          </button>
        </div>

        {showDiscountModal && (
          <Modal onClick={setShowDiscountModal} closeOnOutsideClick={false}>
            <DiscountModal
              setShowDiscountModal={setShowDiscountModal}
              businessId={props.business._id}
              discount={editDiscount}
              getDiscounts={_getDiscounts}
            />
          </Modal>)}

        <div className="w-full h-full flex flex-col bg-white rounded-md shadow-lg pb-5">
          {discounts.length > 0 ?
            (discounts.map((discount, i) => (
              <>
                <div className="flex justify-between items-center border-b-2 px-3 py-3">
                  <div className="flex items-center">
                    <div className="flex justify-center items-center h-12 w-12 rounded-full bg-[#C4DBCC] text-[20px]">
                      {i + 1}
                    </div>
                    <div className="flex flex-col ml-3">
                      <h3 className="text-[#19525A] text-[16px]">
                        {discount.name}
                      </h3>
                      <h4 className="text-[#5B5B5B] text-[14px]">
                        {discount.discountTtype === "percentage" ? "" : "$"}{discount.amount}{discount.discountTtype === "percentage" ? "% Discount" : discount.discountTtype === "overwrite" ? " Overwrite price" : " Off"}
                      </h4>
                      <h4 className="text-[#5B5B5B] text-[14px]">
                        {discount.applicableTo === "everything" ? "All Products and Services" : discount.applicableTo === "products" ? "All Products" : "All Services"}
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-center mr-4">
                    <button onClick={() => {
                      setEditDiscount(discount);
                      setShowDiscountModal(true)
                    }} className="h-[32px] w-[80px] bg-[#19525A] text-[16px] text-white rounded-md shadow-md mr-4">
                      Edit
                    </button>
                    <Image
                      src="/icons/delete.png"
                      height="28px"
                      width="28px"
                      alt="delete"
                      onClick={() => handleDeleteDiscount(discount._id)}
                    />
                  </div>
                </div>
              </>
            ))
            ) : <div className="w-full h-full flex justify-center items-center">
              <h3 className="text-[#5B5B5B] text-2xl">No Discounts</h3>
            </div>}
        </div>
      </div>
    </>
  );
};
const mapStateToProps = (state) => ({
  user: state.user,
  business: state.business?.info?.business,
  loading: state.business?.loading,
});
export default connect(mapStateToProps, {})(
  Discount
);
