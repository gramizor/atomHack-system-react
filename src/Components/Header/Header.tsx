import { Anchor, Group } from '@mantine/core';
import './Header.scss'

function Header() {
    return (
        <div className="header">
            <Anchor
                href="https://atominit.cry1s.ru/"
                // target="_blank"
                underline="hover"
                c="white"
                size='lg'
                fw={500}
            >
                Панель конфигурации
            </Anchor>
            <div className="other-services">
                <Group>
                    <Anchor
                        className="custom-anchor"
                        href="https://atomearth.cry1s.ru/"
                        target="_blank"
                        underline="hover"
                        c="white"
                        size='lg'
                        fw={500}
                    >
                        Сервис земли
                    </Anchor>
                    <Anchor
                        className="custom-anchor"
                        href="https://atommars.cry1s.ru/"
                        target="_blank"
                        underline="hover"
                        c="white"
                        size='lg'
                        fw={500}
                    >
                        Сервис марса
                    </Anchor>
                </Group>
            </div>
        </div>
    );
}

export default Header