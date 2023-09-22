import React, { useEffect, useRef, useState } from "react";
import { BiCamera, BiMicrophone, BiPlusCircle, BiSend } from "react-icons/bi";
import { AiOutlinePaperClip } from "react-icons/ai";
import { BsEmojiSmile } from "react-icons/bs";
import Modal from "../Modal";
import GroupMembersModal from "./GroupMessage/GroupMemberModal";
import VoiceRecordComponent from "./VoiceMessage/VoiceRecordComponent";
import dynamic from "next/dynamic";
import { uploadAFile } from "../../utils/fileUpload";
import { PulseLoader } from "react-spinners";
import CaptureImage from "./CameraFeed/CameraFeed";
// @ts-ignore
import CreateInvoiceModal from "./Invoice/CreateInvoiceModal";
import CreateReceipt from "./Invoice/CreateInvoiceModal";
import CaseModal from "./CaseModal/CaseModal";
const EmojiPicker = dynamic(() => import("emoji-picker-react"), {
  ssr: false,
});

const MessageBottom = ({
  onChangeMessage,
  onSendMessage,
  message,
  conversationList,
  conversation,
  myUser,
}) => {
  const [showPlusMore, setShowPlusMore] = React.useState(false);
  const [showCreateGroupModal, setShowCreateGroupModal] = React.useState(false);
  const [showCreateReceiptModal, setShowCreateReceiptModal] =
    React.useState(false);
  const [showCaseModal, setShowCaseModal] = useState(false)
  const [recordedBlob, setRecordedBlob] = React.useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = React.useState(false);
  const [isRecording, setIsRecording] = React.useState(false);
  const [uploadingFile, setUploadingFile] = React.useState(false);
  const [openCamera, setOpenCamera] = React.useState(false);
  const morePlusRef = useRef();
  const emojiPickerRef = useRef();

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);

  const onFileUpload = async (event, folder, asString = true) => {
    // if (parseInt(bytesToSize(event.target.files[0].size)) > 5) {
    // 	setUploadingFile(false);
    // 	return alert("Max file size limit error.");
    // }
    setUploadingFile(true);

    const selectedFile = event.target.files[0];
    const fileName = asString
      ? "capchuredImage" + new Date().getTime()
      : selectedFile.name;
    const fileExtension = asString ? "png" : selectedFile.name.split(".").pop();
    const fileType = asString ? "image/png" : selectedFile.type;

    try {
      // @ts-ignore
      uploadAFile({
        fileName: `${fileName}.${fileExtension}`,
        folder,
        file: selectedFile,
        uploadAsString: asString,
        // @ts-ignore
        onProgress: (progress) => { },
        onSetDownloadUrl: (url) => {
          // console.log(url);
          setUploadingFile(false);
          onSendMessage({
            ...event,
            defaultPrevented: true,
            target: {
              file: url,
              message: "New Attachment",
              messageType: `${fileType}`,
            },
          });
        },
      });
    } catch (error) {
      // console.log(error);
      // setMessage(error.response.data.message);
    }
  };

  const handleClickOutside = (event) => {
    // @ts-ignore
    if (morePlusRef.current && !morePlusRef.current.contains(event.target)) {
      setShowPlusMore(false);
    }
    // @ts-ignore
    if (
      emojiPickerRef.current &&
      // @ts-ignore
      !emojiPickerRef.current.contains(event.target)
    ) {
      setShowEmojiPicker(false);
    }
  };

  // @ts-ignore
  const onEmojiClick = (emojiObject, e) => {
    if (!emojiObject) return;
    onChangeMessage({
      target: { value: message + emojiObject.emoji },
    });
  };

  const getOtherUser = (conversation) => {
    return conversation?.participants?.find((user) => user._id !== myUser?._id);
  };

  return (
    <div className="h-[10vh]  bottom-0 w-full flex justify-between items-center shadow-inner px-3">
      <div className="flex items-center">
        {openCamera && (
          <Modal onClick={setOpenCamera} closeOnOutsideClick={true}>
            <CaptureImage
              setOpenCamera={setOpenCamera}
              onFileUpload={onFileUpload}
            />
          </Modal>
        )}
        <div
          onClick={() => setOpenCamera(true)}
          title="Camera"
          className="text-xl hover:bg-slate-200 hover:text-gray-700 rounded-full p-1.5 transition sm:p-2.5 text-[#8D8D8D]"
        >
          <BiCamera />
        </div>
        <div
          title="Attach"
          className=" text-xl hover:bg-slate-200 hover:text-gray-700 rounded-full transition p-1.5 sm:p-2.5 text-[#8D8D8D]"
        >
          <label>
            <AiOutlinePaperClip />
            <input
              type="file"
              className="hidden"
              name="messageFiles"
              onChange={(event) => {
                onFileUpload(event, "messageFiles");
              }}
            />
          </label>
        </div>

        <div
          onClick={() => setIsRecording(true)}
          title="Audio"
          className={`h-10 w-10 text-xl ${isRecording ? "bg-slate-200 text-rose-500" : "hover:text-gray-700"
            } hover:bg-slate-200 rounded-full transition p-1.5 sm:p-2.5 text-[#8D8D8D]`}
        >
          <BiMicrophone />
        </div>

        {/* group modal  */}
        {showCreateGroupModal && (
          <Modal onClick={setShowCreateGroupModal} closeOnOutsideClick={false}>
            <GroupMembersModal
              setShowCreateGroupModal={setShowCreateGroupModal}
              participants={conversationList.map((chat) => {
                if (chat.conversationType === "oneToOne") {
                  return chat.participants.find(
                    (participant) => participant._id !== myUser._id
                  );
                }
              })}
            />
          </Modal>
        )}

        {/* receipt modal  */}
        {showCreateReceiptModal && (
          <Modal
            onClick={setShowCreateReceiptModal}
            closeOnOutsideClick={true}
            disableBlur={true}
          >
            <CreateReceipt
              setShowCreateReceiptModal={setShowCreateReceiptModal}
              receiptFor={getOtherUser(conversation)?._id}
              practitioner={myUser?._id}
              onSendMessage={onSendMessage}
            />
          </Modal>
        )}

        {/* case modal  */}
        {showCaseModal && (
          <Modal
            onClick={setShowCaseModal}
            closeOnOutsideClick={true}
            disableBlur={true}
          >
            <CaseModal
              receiptFor={getOtherUser(conversation)?._id}
              practitioner={myUser?._id}
              senderName={myUser?.fullName}
              setShowCaseModal={setShowCaseModal}
              onSendMessage={onSendMessage}
            />
          </Modal>
        )}



        <div ref={morePlusRef} title="More" className="relative">
          {showPlusMore && (
            <div className="absolute bottom-12 -left-2 w-40 border-[1px] border-r-slate-400 bg-white rounded-md shadow-md overflow-hidden">
              <div className="flex justify-between items-center">
                <div className="w-full flex flex-col text-start ">
                  <div
                    onClick={() => {
                      setShowPlusMore(false);
                      setShowCreateGroupModal(true);
                    }}
                    className="p-2 hover:bg-slate-200 cursor-pointer "
                  >
                    <p className="text-sm">Create Group</p>
                  </div>
                  <div
                    onClick={() => {
                      setShowPlusMore(false);
                      setShowCaseModal(true);
                    }}
                    className="p-2 hover:bg-slate-200 cursor-pointer">
                    <p className="text-sm">Create Case</p>
                  </div>
                  <div
                    onClick={() => {
                      setShowPlusMore(false);
                      setShowCreateReceiptModal(true);
                    }}
                    className="p-2 hover:bg-slate-200 cursor-pointer "
                  >
                    <p className="text-sm">Create Invoice</p>
                  </div>
                  <div className="p-2 hover:bg-slate-200 cursor-pointer">
                    <p className="text-sm">Send Prescription</p>
                  </div>
                  <div className="p-2 hover:bg-slate-200 cursor-pointer">
                    <p className="text-sm">Send Chart</p>
                  </div>
                  <div className="p-2 hover:bg-slate-200 cursor-pointer">
                    <p className="text-sm">Send Video</p>
                  </div>
                  <div className="p-2 hover:bg-slate-200 cursor-pointer">
                    <p className="text-sm">Send Case Files</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div
            onClick={() => setShowPlusMore(!showPlusMore)}
            className=" text-xl hover:bg-slate-200 hover:text-gray-700 rounded-full transition p-1.5 sm:p-2.5 text-[#8D8D8D]"
          >
            <BiPlusCircle />
          </div>
        </div>
      </div>

      <div className="flex w-full justify-between items-center border-2 px-2 rounded-3xl mx-0 sm:mx-3 hover:ring-2 hover:border-white ring-indigo-500">
        {isRecording ? (
          <VoiceRecordComponent setRecordedBlob={setRecordedBlob} />
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSendMessage({
                defaultPrevented: true,
                target: {
                  message,
                  messageType: "text",
                },
              });
            }}
            className="w-full"
          >
            <input
              onChange={onChangeMessage}
              type="text"
              value={message}
              placeholder="Type messages"
              className="border-none outline-none p-1 w-full focus:ring-0"
            />
          </form>
        )}
        <div
          ref={emojiPickerRef}
          title="Emoji"
          className="relative text-xl cursor-pointer h-8 w-8 flex justify-center items-center hover:bg-slate-200 hover:text-gray-700 rounded-full transition text-[#8D8D8D] mx-0 p-2 sm:mx-1"
        >
          {showEmojiPicker && (
            <div className="absolute bottom-12 right-2 border-[1px] border-r-slate-400 bg-white rounded-md shadow-md overflow-hidden">
              <
                // @ts-ignore
                EmojiPicker
                width="100%"
                onEmojiClick={onEmojiClick}
                skinTonesDisabled={true}
                previewConfig={{ showPreview: false }}
              />
            </div>
          )}
          {isRecording ? (
            <p
              onClick={() => {
                setIsRecording(false);
                setRecordedBlob(null);
              }}
              className=""
            >
              ✖
            </p>
          ) : (
            <BsEmojiSmile
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            />
          )}
        </div>
      </div>
      {uploadingFile ? (
        <PulseLoader />
      ) : (
        <div
          // @ts-ignore
          onClick={async (e) => {
            if (recordedBlob) {
              setUploadingFile(true);
              // @ts-ignore
              uploadAFile({
                fileName: `${new Date().getTime()}.mp3`,
                folder: `${myUser.userName}/recording`,
                file: recordedBlob,
                // @ts-ignore
                onProgress: (progress) => { },
                onSetDownloadUrl: async (url) => {
                  setUploadingFile(false);
                  onSendMessage({
                    defaultPrevented: true,
                    target: {
                      file: url,
                      message: "New Voice Message",
                      messageType: "audio",
                    },
                  });
                  setIsRecording(false);
                  setRecordedBlob(null);
                },
              });
            } else {
              onSendMessage({
                defaultPrevented: true,
                target: {
                  message,
                  messageType: "text",
                },
              });
            }
          }}
          title="Send"
          className={`text-xl hover:bg-slate-200 hover:text-gray-700 rounded-full transition p-2 sm:p-3 text-[#8D8D8D] mx-0 sm:mx-1`}
        >
          <BiSend
            color={recordedBlob || message.length > 0 ? "#003f48" : "grey"}
          />
        </div>
      )}
    </div>
  );
};

export default MessageBottom;
