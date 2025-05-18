import { Button, Modal, Popconfirm, Space } from "antd";
import React, { useEffect, useState } from "react";
import MoodForm from "./moodForm";
// import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Axios from "@/utils/axios";
import toast from "react-hot-toast";
import { formatFriendlyDate } from "@/utils/timeConverter";
import Loader from "@/shared/loader";

const MoodBoardComponent = () => {
  const [moods, setMoods] = useState<any>([]);

  const [showForm, setShowForm] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedMood, setSelectedMood] = useState<any>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("authToken");
      if (token) {
        setAuthToken(token);
      }
    }
  }, []);

  const getMoods = async (token: string) => {
    try {
      const response = await Axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}moods`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setMoods(response?.data);
    } catch (error) {
      console.error("getting mood error:", error);
      toast.error("Failed to get mood.");
    }
  };

  useEffect(() => {
    if (authToken) {
      getMoods(authToken);
    }
  }, [authToken, showForm, editModalVisible]);

  const handleEditClick = (mood: any) => {
    setSelectedMood(mood);
    setEditModalVisible(true);
  };

  const handleMoodDelete = async (moodId: string, token: string) => {
    try {
      const response = await Axios.delete(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}moods/${moodId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Mood deleted successfully!");
      getMoods(token);
    } catch (error) {
      console.error("Mood deletion error:", error);
      toast.error("Failed to delete mood.");
    }
  };
  if (!authToken) return <Loader />;
  return (
    <>
      <div className=" w-[98%] mx-auto flex flex-col  justify-start gap-4 h-full min-h-screen ">
        <p className="text-lg text-center mt-4 mb-2 text-[#00629d]">
          Create your own mood board to visualize your ideas and inspirations.
        </p>
        <div
          className="flex justify-end  "
          onClick={() => setShowForm(!showForm)}
        >
          <Button type="primary" size="large">
            {showForm ? "Cancel" : "Add Mood"}
          </Button>
        </div>
        {showForm && <MoodForm setShowForm={setShowForm} />}

        <div className="flex flex-col items-center justify-center mt-8  h-full">
          {moods.length !== 0 && (
            <h1 className="text-2xl font-semibold mr-auto mb-8  ">
              Your Past Moods
            </h1>
          )}
          {moods.map((mood: any) => (
            <div
              key={mood.id}
              style={{
                width: 600,
                margin: "0 auto",
                border: "1px solid #e4e4e4",
                borderRadius: 8,
                padding: 16,
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                background: "#fff",
                marginBottom: 20,
                position: "relative",
              }}
            >
              <h3
                className="font-semibold"
                style={{ marginBottom: 8, fontSize: 18 }}
              >
                {mood.emoji} {mood.moodTitle}
              </h3>
              <p style={{ color: "#555", marginBottom: 15 }}>
                {mood.moodDescription}
              </p>
              <span className="text-sm text-gray-500">
                {formatFriendlyDate(mood.createdAt)}
              </span>

              <div
                style={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                  display: "flex",
                  gap: 8,
                }}
              >
                <Button
                  type="default"
                  
                  onClick={() => handleEditClick(mood)}
                />

                <Popconfirm
                  //   key={index}
                  title="Delete Mood"
                  onConfirm={(e: any) => {
                    e.stopPropagation();
                    if (authToken) {
                      handleMoodDelete(mood?.id, authToken);
                    }
                  }}
                  onCancel={(e: any) => {
                    e.stopPropagation();
                  }}
                  okButtonProps={{
                    style: {
                      backgroundColor: "red",
                      color: "white",
                    },
                  }}
                  description="Are you sure to delete this Mood?"
                  okText="Delete"
                  cancelText="Cancel"
                >
                  <Button
                    type="primary"
                  
                    onClick={(e) => e.stopPropagation()}
                    danger
                  />
                </Popconfirm>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Modal */}
      <Modal
        className="w-full"
        // width="90%"
        title="Edit Mood"
        open={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        footer={null}
        destroyOnClose
      >
        <MoodForm
          initialData={selectedMood}
          onClose={() => setEditModalVisible(false)}
        />
      </Modal>
    </>
  );
};

export default MoodBoardComponent;
