import React from "react";
import { useAuth } from "../../context/AuthContext";
import {
  Card,
  Avatar,
  Descriptions,
  Typography,
  Spin,
  Result,
  Tag,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  CalendarOutlined,
  ManOutlined,
  WomanOutlined,
  HomeOutlined,
  BankOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import styles from "./ProfilePage.module.css";

const { Title, Text } = Typography;

const ProfilePage = () => {
  const { userData, loading } = useAuth();

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <Spin size="large" tip="Đang tải thông tin người dùng..." />
      </div>
    );
  }

  if (!userData) {
    return (
      <Result
        status="warning"
        title="Chưa đăng nhập"
        subTitle="Vui lòng đăng nhập để xem thông tin cá nhân."
      />
    );
  }

  const genderIcon =
    userData.gender === "male" ? <ManOutlined /> : <WomanOutlined />;
  const genderColor = userData.gender === "male" ? "blue" : "magenta";

  return (
    <div className={styles.container}>
      <Card className={styles.headerCard} bordered={false}>
        <div className={styles.headerContent}>
          <Avatar
            size={80}
            src={userData.image || userData.avatar}
            icon={<UserOutlined />}
            className={styles.avatar}
          />
          <div className={styles.headerText}>
            <Title level={3} style={{ margin: 0 }}>
              {userData.name}
            </Title>
            <Text type="secondary">
              <MailOutlined style={{ marginRight: 6 }} />
              {userData.email}
            </Text>
            {userData.phone && (
              <div style={{ marginTop: 4 }}>
                <Text type="secondary">
                  <PhoneOutlined style={{ marginRight: 6 }} />
                  {userData.phone}
                </Text>
              </div>
            )}
          </div>
        </div>
      </Card>

      <Card
        title="Thông tin cá nhân"
        className={styles.infoCard}
        bordered={false}
      >
        <Descriptions column={1} colon={false} layout="horizontal">
          <Descriptions.Item
            label={
              <span>
                <CalendarOutlined style={{ marginRight: 8 }} />
                Ngày sinh
              </span>
            }
          >
            {userData.dob || "N/A"}
          </Descriptions.Item>

          <Descriptions.Item
            label={
              <span>
                {genderIcon}
                <span style={{ marginLeft: 8 }}>Giới tính</span>
              </span>
            }
          >
            <Tag color={genderColor}>
              {userData.gender === "male" ? "Nam" : "Nữ"}
            </Tag>
          </Descriptions.Item>

          <Descriptions.Item
            label={
              <span>
                <BankOutlined style={{ marginRight: 8 }} />
                Địa chỉ công ty
              </span>
            }
          >
            {userData.companyAddress || "N/A"}
          </Descriptions.Item>

          <Descriptions.Item
            label={
              <span>
                <HomeOutlined style={{ marginRight: 8 }} />
                Địa chỉ nhà
              </span>
            }
          >
            {userData.homeAddress || "N/A"}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
};

export default ProfilePage;
