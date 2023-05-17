
;; title: waitlist
;; version:
;; summary:
;; description:

;; traits
;;

;; token definitions
;; 

;; constants
(define-constant max-waitlist-number u10)
(define-constant principal-in-waitlist (err u101))
(define-constant waitlist-is-full (err u105))

;; data vars
(define-data-var number-joined-principal uint u0)

;; data maps
(define-map waitlist-address principal bool)

;; public functions
(define-public (join-wait-list) 
  (let 
     (
        (count (+ (var-get number-joined-principal) u1))) 
        (asserts! (check-if-principal-is-in-waitlist) principal-in-waitlist)
        (asserts! (check-if-waitlist-is-full) waitlist-is-full)
        (map-set waitlist-address tx-sender true)
        (var-set number-joined-principal count)
        (ok count)
    )
)

(define-public (leave-wait-list) 
  (let 
     ( 
        (count (- (var-get number-joined-principal) u1))) 
        (asserts! (not (check-if-principal-is-in-waitlist)) principal-in-waitlist)
        (map-delete waitlist-address tx-sender)
        (var-set number-joined-principal count)
        (ok count)
    )
)



;; read only functions
(define-read-only (wait-list-count) 
   (ok (var-get number-joined-principal))
)

;; private functions
(define-private (check-if-principal-is-in-waitlist) 
  (not (is-eq (unwrap-panic (map-get? waitlist-address tx-sender)) true))
)

(define-private (check-if-waitlist-is-full) 
  (< (var-get number-joined-principal) max-waitlist-number)
)

