import React, { Suspense, memo } from "react";
import { Outlet } from "react-router-dom";

import { Layout } from "antd";
import MainMenu from "@/components/MainMenu";
import MyAvatar from "@/views/Main/Avatar";
import styles from "./main.module.scss";

import {parseDDL} from "@/views/Main/MySqlParser";

const { Header, Content } = Layout;

function main() {
  console.log("main-2")
  const ddlSQL = ``;
  parseDDL();
  return (
    <div className={styles.main}>
      <Layout className={styles.layout}>
        <Header className={styles.header} style={{ background: "white", height:60 }}>
          <div className={styles.logo}>
            {/* <img className={styles.log} src={log}></img> */}
          </div>
          <MainMenu />
          <div className={styles.others}>
            <MyAvatar></MyAvatar>
          </div>
        </Header>
        <Content>
          <div className={styles.content}>
            <Suspense>
              <Outlet />
            </Suspense>
          </div>
        </Content>
      </Layout>
    </div>
  );
};

export default memo(main);
