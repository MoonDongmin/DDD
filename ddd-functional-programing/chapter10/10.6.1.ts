import * as E from "fp-ts"

const toCustomerInfo = ({
                            firstName,
                            lastName,
                            emailAddress,
                        }: CustomerInfo): E.Either<ErrPrimitiveConstraints, CustomerInfo> => pipe(
    E.Do,
    // DTO로부터 단순값들을 추출 및 검증하여 성공하면 바인딩, 실패 시 바로 오류 처리
    E.bind('first', () => String50.create(firstName)),
    E.bind('last', () => String50.create(lastName)),
    E.bind('email', () => String50.create(emailAddress)),
    // 도메인 객체를 만들기 위해 요소들 묶기
    E.let('name', ({first, last}) => new PersonName(first, last)),
    E.map(scope => new CustomerInfo(scope.name, scope.email))
)