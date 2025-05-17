import { Button, Modal, Popconfirm, Space } from "antd";
import React, { useState } from "react";
import MoodForm from "./moodForm";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const moods = [
  {
    id: 1,
    emoji: "😊",
    moodTitle: "happy",
    moodDescritption: "I am feeling great and joyful today!",
  },
  {
    id: 2,
    emoji: "😢",
    moodTitle: "sad",
    moodDescritption: "It’s been a tough day, feeling a bit down.",
  },
  {
    id: 3,
    emoji: "😠",
    moodTitle: "angry",
    moodDescritption: "Really frustrated with how things went.",
  },
  {
    id: 4,
    emoji: "😟",
    moodTitle: "upset",
    moodDescritption: "Something bothered me today, not in the best mood.",
  },
  {
    id: 5,
    emoji: "😕",
    moodTitle: "confuse",
    moodDescritption: "Not sure what’s going on, everything feels unclear.",
  },
  {
    id: 6,
    emoji: "😊",
    moodTitle: "happy",
    moodDescritption: "Just got some great news, feeling amazing!",
  },
];

const MoodBoardComponent = () => {
  const [showForm, setShowForm] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedMood, setSelectedMood] = useState<any>(null);

  const handleEditClick = (mood: any) => {
    setSelectedMood(mood);
    setEditModalVisible(true);
  };
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
        {showForm && <MoodForm />}

        <div className="flex flex-col items-center justify-center mt-8  h-full">
          <h1 className="text-xl font-semibold mr-auto  ">Your Past Moods</h1>
          {moods.map((mood) => (
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
              <h3 style={{ marginBottom: 8, fontSize: 18 }}>
                {mood.emoji} {mood.moodTitle}
              </h3>
              <p style={{ color: "#555", marginBottom: 15 }}>
                {mood.moodDescritption}
              </p>

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
                  icon={<EditOutlined />}
                  onClick={() => handleEditClick(mood)}
                />

                <Popconfirm
                  //   key={index}
                  title="Delete Opinion"
                  onConfirm={(e: any) => {
                    e.stopPropagation();
                    // DeleteOpinion(item?.id);
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
                  description="Are you sure to delete this Opinion?"
                  okText="Delete"
                  cancelText="Cancel"
                >
                  <Button
                    type="primary"
                    icon={<DeleteOutlined />}
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
