// 잘못된 입력을 받으면 패닉하는 작업 흐름
import {match} from "ts-pattern";

const workflowPart2 = (input: Input) => {
    if (input === 0) {
        throw Error("DivideByZeroError");
    }
}

// 애플리케이션의 최상위 함수
// 모든 작업 흐름에서 발생한 예외를 포착함
function main() {
    // 모든 작업 흘므을 try-catch 블록으로 감쌈
    try {
        const result1 = workflowPart1();
        const result2 = workflowPart2(result1);
        console.log(`the result is ${result2}`);
    } catch (e) {
        match(e)
            .with(P.instanceOf(OutOfMemoryException), () => console.log("exited with OutOfMemoryException"))
            .with(P.instanceOf(DivideByZeroException), () => console.log("exited with DivideByZeroException"))
            .otherwise(() => console.log("exited with" + e.message));
    }
}