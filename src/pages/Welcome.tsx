import { PageContainer } from '@ant-design/pro-components';
import { Card, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { StatisticCard } from '@ant-design/pro-components';
import { getInviteInfo } from '@/services/ant-design-pro/admin';
import styles from './Welcome.less';

const { Statistic, Divider } = StatisticCard;

const Welcome: React.FC = () => {
  const [data, setData] = useState({
    all_invite_user: 0,
    all_invite_orders: 0,
    lm_invite_orders: 0,
    lm_invite_user: 0,
    lm_user_ratio: '-',
    lm_order_ratio: '-',
  });
  useEffect(() => {
    getInviteInfo({}).then((res) => {
      setData(res);
    });
  }, []);

  return (
    <PageContainer>
      <Card>
        <StatisticCard.Group direction={'row'}>
          <StatisticCard
            statistic={{
              title: '总邀请注册用户数',
              value: data.all_invite_user,
            }}
          />
          <Divider type={'horizontal'} />
          <StatisticCard
            statistic={{
              title: '上月邀请注册用户数',
              value: data.lm_invite_user,
              description: <Statistic title="占比" value={data.lm_user_ratio} />,
            }}
            chart={
              <img
                src="https://gw.alipayobjects.com/zos/alicdn/ShNDpDTik/huan.svg"
                alt="百分比"
                width="100%"
              />
            }
            chartPlacement="left"
          />
          <StatisticCard
            statistic={{
              title: '历史邀请注册用户数',
              value: data.all_invite_user - data.lm_invite_user,
              description: <Statistic title="占比" value="38.5%" />,
            }}
            chart={
              <img
                src="https://gw.alipayobjects.com/zos/alicdn/6YR18tCxJ/huanlv.svg"
                alt="百分比"
                width="100%"
              />
            }
            chartPlacement="left"
          />
        </StatisticCard.Group>
      </Card>
    </PageContainer>
  );
};

export default Welcome;
