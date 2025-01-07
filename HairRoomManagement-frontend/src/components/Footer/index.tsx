import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import '@umijs/max';
import React from 'react';

const Footer: React.FC = () => {
  const defaultMessage = 'fdt';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'codeNav',
          title: 'gitee-fdt',
          href: 'https://gitee.com/feng-detian',
          blankTarget: true,
        },
        {
          key: 'github',
          title: (
            <>
              <GithubOutlined /> fdt
            </>
          ),
          href: 'https://github.com/xiaoxiaoyeyuzhong?tab=repositories',
          blankTarget: true,
        },
      ]}
    />
  );
};
export default Footer;
