import { PulseLoader } from "react-spinners";
import axios from "../../utils/axios";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
function SubscriptionCheckout(props) {
  const router = useRouter();
  const [block, setBlock] = useState(false);
  const { selectedPackage, interval, practitionerNum, setErrorMessage } = props;

  const checkout = async () => {
    try {
      const subscription = await axios.post(
        "/adminSubscription/create",
        {
          name: selectedPackage.name,
          interval: interval,
          packageId: selectedPackage._id,
          practitionerNum: practitionerNum,
          trialDays: 30,
        },
        {
          headers: {
            Authorization: `Bearer ${cookie.get("jwt")}`,
          },
        }
      );
      // console.log(subscription);

      const response = await axios.post(
        "/payment/save-card",
        {
          success_url: `${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}/user-dashboard?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: "http://localhost:3000/failed",
        },
        {
          headers: {
            Authorization: `Bearer ${cookie.get("jwt")}`,
          },
        }
      );

      props.setLoading(false);
      const url = response.data.url;

      router.push(url);
    } catch (e) {
      props.setLoading(false);
    }
  };
  useEffect(() => {
    if (props.status == "success" && block == false) {
      if (selectedPackage.name == "Pay As You Go") {
        router.push("/user-dashboard");
        return;
      }
      setBlock(true);
      checkout();
    }
  }, [props]);

  return (
    <div>
      <div>
        {props.loading ? (
          <PulseLoader />
        ) : (
          <button
            onClick={(e) => {
              if (!selectedPackage) {
                setErrorMessage("Select a package");

                return;
              }
              props.setLoading(true);

              props.updateBusiness();
            }}
            className="w-[380px] h-[36px] bg-[#19525A] text-white rounded-md"
          >
            Subscribe With Card
          </button>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    status: state.business?.status,
  };
};
export default connect(mapStateToProps)(SubscriptionCheckout);
