
import { Clarinet, Tx, Chain, Account, types } from 'https://deno.land/x/clarinet@v1.4.2/index.ts';
import { assertEquals } from 'https://deno.land/std@0.170.0/testing/asserts.ts';

Clarinet.test({
    name: "wait-list count returns u0 for the first time",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        let deployer = accounts.get("deployer")

        let waitListCount = chain.callReadOnlyFn("waitlist", "wait-list-count", [], deployer.address)

        waitListCount.result.expectUint(0)
    },
})

Clarinet.test({
    name: "join waitlist and leave waitlist",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        let deployer = accounts.get("deployer")

        // join waitlist
        let block = chain.mineBlock([
            Tx.contractCall("waitlist", "join-wait-list", [], deployer.address)
        ])
         // Get the first (and only) transaction receipt
        let [ receipt ] = block.receipts
        receipt.result.expectUint(1)

        //Get the counter value
        let waitListCount = chain.callReadOnlyFn("waitlist", "wait-list-count", [], deployer.address)

        waitListCount.result.expectUint(1)


        // Leave waitlist
        let _block = chain.mineBlock([
            Tx.contractCall("waitlist", "leave-wait-list", [], deployer.address)
        ])
         // Get the first (and only) transaction receipt
        let [ _receipt ] = _block.receipts

        _receipt.result.expectUint(0)
    },
})


