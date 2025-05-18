import { Button, Form, Input, Radio, Select, Space, message } from "antd";
import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Axios from "@/utils/axios";

const { TextArea } = Input;

interface FormValues {
  emoji: string;
  mood: string;
  description?: string;
}
interface MoodFormProps {
  initialData?: any;
  onClose?: () => void;
  setShowForm?: (show: boolean) => void;
}
const MoodForm: React.FC<MoodFormProps> = ({
  initialData,
  onClose,
  setShowForm,
}) => {
  const [loading, setLoading] = React.useState(false);
  const [form] = Form.useForm<FormValues>();

  // Set initial values on modal open
  React.useEffect(() => {
    if (initialData) {
      form.setFieldsValue({
        emoji: initialData.moodTitle,
        mood: initialData.moodTitle,
        description: initialData.moodDescription,
      });
    }
  }, [initialData, form]);

  const getEmoji = (value: string) => {
    const map: Record<string, string> = {
      happy: "😊",
      sad: "😢",
      angry: "😠",
      upset: "😟",
      confuse: "😕",
    };
    return map[value] || "";
  };

  const moods = [
    { label: "😊 Happy", value: "happy" },
    { label: "😢 Sad", value: "sad" },
    { label: "😠 Angry", value: "angry" },
    { label: "😟 Upset", value: "upset" },
    { label: "😕 Confuse", value: "confuse" },
  ];

  const handleSubmit = async (values: FormValues) => {
    const token = localStorage.getItem("authToken");
    const payload = {
      emoji: getEmoji(values.emoji),
      moodTitle: values.mood,
      moodDescription: values.description || "",
    };

    try {
      setLoading(true);
      let response;

      if (initialData) {
        response = await Axios.put(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}moods/${initialData.id}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        toast.success("Mood updated successfully!");
        if (onClose) {
          onClose();
        }
      } else {
        response = await Axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}moods`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        toast.success("Mood logged successfully!");
      }

      if (setShowForm) {
        setShowForm(false);
      }

      form.resetFields();
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to submit mood.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{ maxWidth: 800, margin: "0 auto" }}
      className="bg-white card_shadow p-8 rounded-md"
    >
      <h3 className="text-xl font-semibold text-center mb-4">Log Your Mood</h3>
      <Form<FormValues> form={form} layout="vertical" onFinish={handleSubmit}>
        {/* Emoji Selection */}
        <Form.Item
          className="mb-4"
          name="emoji"
          label={
            <span style={{ fontSize: "16px", fontWeight: 500 }}>
              Select your emoji
            </span>
          }
          rules={[{ required: true, message: "Please select an emoji!" }]}
        >
          <Radio.Group buttonStyle="solid" size="large" className="mb-4">
            <Space direction="horizontal">
              {moods.map((mood) => (
                <Radio.Button key={mood.value} value={mood.value}>
                  {mood.label}
                </Radio.Button>
              ))}
            </Space>
          </Radio.Group>
        </Form.Item>

        {/* Mood Dropdown */}
        <Form.Item
          className="mb-4"
          name="mood"
          label={
            <span style={{ fontSize: "16px", fontWeight: 500 }}>
              Select your mood
            </span>
          }
          rules={[{ required: true, message: "Please select your mood!" }]}
        >
          <Select placeholder="Choose a mood" size="large">
            {moods.map((mood) => (
              <Select.Option key={mood.value} value={mood.value}>
                {mood.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        {/* Mood Description */}
        <Form.Item
          name="description"
          label={
            <span style={{ fontSize: "16px", fontWeight: 500 }}>
              Mood Description (optional)
            </span>
          }
          className="mb-4"
        >
          <TextArea
            rows={4}
            placeholder="Describe your mood..."
            maxLength={200}
            showCount
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            loading={loading}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default MoodForm;
