md extensions
cd extensions

IF EXIST oops-plugin-framework (
goto update
) ELSE (
goto clone
)

:clone
git clone -b 3.6.0 https://gitee.com/dgflash/oops-plugin-framework.git

:update
cd oops-plugin-framework
git pull